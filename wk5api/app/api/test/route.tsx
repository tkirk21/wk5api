//app/api/test/route.tsx
import { createHash } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'This API loves CSE3CWA-CSE5007' });
}


export async function POST(req: NextRequest, context: { params: { id: string } }) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

    // Create a SHA-256 hash of the ID
    const hash = createHash('sha256')  // Specify the hashing algorithm
    .update(id)                      // Update with the data (ID)
    .digest('hex');                   // Finalize the hash and return it as a hexadecimal string

  return NextResponse.json({ hash });