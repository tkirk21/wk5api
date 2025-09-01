//app/api/users/route.tsx
import { NextResponse } from 'next/server';
import { User } from './types/user';

let users: User[] = [];
let nextUserId = 1; // Initialize user ID counter

// Helper function to find a user by ID
function findUser(id: number) {
  return users.find((user) => user.id === id);
}

// GET route: Fetch all users or a specific user by ID
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('id'); // Check if there's an 'id' in the query string

    if (userId) {
      // If an `id` is present, return the specific user
      const user = findUser(parseInt(userId));
      if (!user) {
        return new NextResponse('User not found', { status: 404 });
      }
      return NextResponse.json(user);
    } else {
      // If no `id`, return all users
      return NextResponse.json(users);
    }
  } catch (error) {
    console.error('Error in GET request:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// POST route: Create a new user
export async function POST(request: Request) {
    try {
      // Parse incoming request body
      const { name, lineStatus }: { name: string; lineStatus: 'online' | 'offline' } = await request.json();
      console.log('Received data:', { name, lineStatus });
  
      // Ensure required fields are present
      if (!name) {
        return new NextResponse('User name is required', { status: 400 });
      }
      if (!lineStatus) {
        return new NextResponse('Line Status is required', { status: 400 });
      }
  
      // Create a new user object
      const newUser: User = {
        id: users.length, // Increment the user ID
        name: name,
        lineStatus: lineStatus,
      };
      
      console.log('New user object:', newUser);
  
      // Add the new user to the users array
      users.push(newUser);
      console.log('Updated users array:', users);
  
      // Return the newly created user object in the response
      return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
      console.error('Error in POST request:', error);
      return new NextResponse('Invalid request body', { status: 400 });
    }
  }
  


// PATCH route: Update a user's details
export async function PATCH(request: Request) {
    try {
      const url = new URL(request.url);  // Get the request URL
      const userId = parseInt(url.searchParams.get('id')!); // Get the `id` from the query string
      
      // Parse the JSON body to get the new name and lineStatus
      const { name, lineStatus } = await request.json();
  
      console.log("Received ID:", userId, "Name:", name, "Line Status:", lineStatus);
  
      // Find the user in the array by ID
      const userIndex = users.findIndex((user) => user.id === userId);
      if (userIndex === -1) {
        return new NextResponse('User not found', { status: 404 });
      }
  
      // Update the user's details
      users[userIndex] = { ...users[userIndex], name, lineStatus };
      return NextResponse.json(users[userIndex]);
    } catch (error) {
      console.error("Error in PATCH request:", error);
      return new NextResponse('Invalid request body', { status: 400 });
    }
  }
  
  
// DELETE route: Remove a user by ID
export async function DELETE(request: Request) {
    try {
      const url = new URL(request.url);  // Get the request URL
      const userId = parseInt(url.searchParams.get('id')!); // Get the `id` from the query string
  
      // Keep the length of the array for comparison
      const initialLength = users.length;
  
      // Remove the user by ID
      users = users.filter((user) => user.id !== userId);
  
      if (users.length === initialLength) {
        return new NextResponse('User not found', { status: 404 });
      }
  
      return new NextResponse(null, { status: 204 }); // No content on successful deletion
    } catch (error) {
      console.error("Error in DELETE request:", error);
      return new NextResponse('Invalid request body', { status: 400 });
    }
  }