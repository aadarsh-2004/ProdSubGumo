import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList, Label
} from 'recharts';
import { TrendingUp, Landmark, BookOpenCheck } from 'lucide-react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

// Helper function to format dates for charts
const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    // Basic validation
    if (isNaN(date.getTime())) {
      return null; // Invalid date
    }
    return date.toLocaleDateString('en-CA'); // YYYY-MM-DD format
  } catch (e) {
    console.error("Error formatting date:", dateString, e);
    return null;
  }
};

function AdminDashboardPage() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [tripsLoading, setTripsLoading] = useState(true);
  const [tripsError, setTripsError] = useState('');
  const [inquiries, setInquiries] = useState([]);
  const [inquiriesLoading, setInquiriesLoading] = useState(true);
  const [inquiriesError, setInquiriesError] = useState('');

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

  useEffect(() => {
    fetchTrips();
    fetchInquiries();
  }, []);

  const fetchTrips = async () => {
    setTripsLoading(true);
    setTripsError('');
    try {
      const response = await fetch(`${API_URL}/trips`);
      if (!response.ok) throw new Error('Failed to fetch trips');
      const data = await response.json();
      setTrips(data);
    } catch (err) {
      setTripsError(err.message || 'Could not load trip data.');
      console.error('Fetch trips error:', err);
    } finally {
      setTripsLoading(false);
    }
  };

  const fetchInquiries = async () => {
    setInquiriesLoading(true);
    setInquiriesError('');
    try {
      const response = await fetch(`${API_URL}/inquiries`);
      if (!response.ok) throw new Error('Failed to fetch inquiries');
      const data = await response.json();
      setInquiries(data);
    } catch (err) {
      setInquiriesError(err.message || 'Could not load inquiry data.');
      console.error('Fetch inquiries error:', err);
    } finally {
      setInquiriesLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin/login');
    console.log('Admin Logged Out');
  };

  const handleDeleteTrip = async (tripId) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      setTripsError('');
      try {
        const response = await fetch(`${API_URL}/trips/${tripId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.message || 'Failed to delete trip');
        }
        fetchTrips();
        console.log(`Trip ${tripId} deleted`);
      } catch (err) {
        setTripsError(err.message || 'Could not delete trip.');
        console.error('Delete trip error:', err);
      }
    }
  };

  const handleAddTrip = () => navigate('/admin/add-trip');
  const handleEditTrip = (tripId) => navigate(`/admin/edit-trip/${tripId}`);

  // --- Chart Data Processing --- 

  const chartConfig = { // Define chart colors/styles if needed
    inquiries: {
      label: "Inquiries",
      color: "hsl(var(--chart-1))",
    },
    destinations: {
      label: "Destinations",
      color: "hsl(var(--chart-2))",
    },
  };

  const dailyInquiriesData = useMemo(() => {
    if (inquiriesLoading || inquiriesError || !inquiries.length) return [];
    const counts = inquiries.reduce((acc, inquiry) => {
      const date = formatDate(inquiry.received_at);
      if (date) {
        acc[date] = (acc[date] || 0) + 1;
      }
      return acc;
    }, {});

    // Get the last 7 days of data, sort by date
    return Object.entries(counts)
      .map(([date, count]) => ({ date, inquiries: count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(-7); // Show last 7 days
  }, [inquiries, inquiriesLoading, inquiriesError]);

  const popularDestinationsData = useMemo(() => {
    if (inquiriesLoading || inquiriesError || !inquiries.length) return [];
    const counts = inquiries.reduce((acc, inquiry) => {
      const dest = inquiry.destination?.trim() || 'Unknown';
      acc[dest] = (acc[dest] || 0) + 1;
      return acc;
    }, {});

    // Get top 5 destinations
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [inquiries, inquiriesLoading, inquiriesError]);

  // Render the trip management section using Shadcn
  const renderTripManagement = () => {
    if (tripsLoading) return <p>Loading trips...</p>; // Replace with Skeleton later?
    if (tripsError) return <p className="text-red-500">Error loading trips: {tripsError}</p>;

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Trip Management</CardTitle>
          <Button onClick={handleAddTrip} size="sm">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Trip
          </Button>
        </CardHeader>
        <CardContent>
          {trips.length === 0 ? (
            <p>No trips found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead className="text-right w-[150px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trips.map((trip) => (
                  <TableRow key={trip.id}>
                    <TableCell className="font-medium">{trip.id}</TableCell>
                    <TableCell>{trip.name}</TableCell>
                    <TableCell>{trip.title}</TableCell>
                    <TableCell>{trip.cost}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="icon" className="mr-2 h-8 w-8" onClick={() => handleEditTrip(trip.id)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit Trip</span>
                      </Button>
                      <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => handleDeleteTrip(trip.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete Trip</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderInquiryManagement = () => {
    if (inquiriesLoading) return <p>Loading inquiries...</p>;
    if (inquiriesError) return <p className="text-red-500">Error loading inquiries: {inquiriesError}</p>;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Received Inquiries</CardTitle>
          <CardDescription>List of inquiries submitted via the contact form.</CardDescription>
        </CardHeader>
        <CardContent>
          {inquiries.length === 0 ? (
            <p>No inquiries found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead className="w-[160px]">Received</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inquiries.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell className="font-medium">{inquiry.id}</TableCell>
                    <TableCell className="whitespace-nowrap">{inquiry.received_at}</TableCell>
                    <TableCell>{inquiry.name}</TableCell>
                    <TableCell>
                      <a href={`mailto:${inquiry.email}`} className="text-blue-600 hover:underline">
                        {inquiry.email}
                      </a>
                    </TableCell>
                    <TableCell>{inquiry.phone || 'N/A'}</TableCell>
                    <TableCell>{inquiry.destination}</TableCell>
                    <TableCell className="max-w-xs whitespace-pre-wrap break-words">
                      {inquiry.message || 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-24 md:py-36 min-h-screen"> {/* Adjusted padding */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>

      {/* Stat Cards Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Trips</CardTitle>
            <Landmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tripsLoading ? '...' : trips.length}</div>
            {/* <p className="text-xs text-muted-foreground">+2 active this month</p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
            <BookOpenCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inquiriesLoading ? '...' : inquiries.length}</div>
            {/* <p className="text-xs text-muted-foreground">+10% from last week</p> */}
          </CardContent>
        </Card>
        {/* Add more stat cards here if needed (e.g., Bookings, Revenue once data exists) */}
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mb-6">
        <Card className="lg:col-span-4"> 
          <CardHeader>
            <CardTitle>Daily Inquiries (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {inquiriesLoading ? <p>Loading chart data...</p> : inquiriesError ? <p className="text-red-500">Error loading chart data.</p> : dailyInquiriesData.length === 0 ? <p>Not enough data.</p> : (
              <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <BarChart accessibilityLayer data={dailyInquiriesData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} width={30} />
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Bar dataKey="inquiries" fill="var(--color-inquiries)" radius={4}>
                    <LabelList position="top" offset={5} className="fill-foreground" fontSize={11} />
                  </Bar>
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Most Popular Destinations (Top 5)</CardTitle>
          </CardHeader>
          <CardContent>
            {inquiriesLoading ? <p>Loading chart data...</p> : inquiriesError ? <p className="text-red-500">Error loading chart data.</p> : popularDestinationsData.length === 0 ? <p>No inquiry data found.</p> : (
              <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <BarChart accessibilityLayer data={popularDestinationsData} layout="vertical" margin={{ top: 5, right: 10, left: 5, bottom: 5 }}>
                  <CartesianGrid horizontal={false} />
                  <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tickMargin={8} className="text-xs" width={80} />
                  <XAxis dataKey="count" type="number" hide />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel indicator="line" />} />
                  <Bar dataKey="count" layout="vertical" fill="var(--color-destinations)" radius={4}>
                    <LabelList dataKey="count" position="right" offset={8} className="fill-foreground" fontSize={11} />
                  </Bar>
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tables Section */}
      <div className="space-y-6">
        {renderTripManagement()}
        {renderInquiryManagement()}
      </div>

    </div>
  );
}

export default AdminDashboardPage;
