import { connectDB } from '@/lib/config/db';
import BlogModel from '@/lib/models/BlogModel';
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
const fs = require('fs');

// Ensure database is connected properly
async function loadDB() {
  await connectDB();
}

loadDB();


//API endpoint to get all blogs
export async function GET(request) {
  const blogId = request.nextUrl.searchParams.get('id');
  if(blogId){
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json(blog)
  }else{
    const blogs = await BlogModel.find({})
    return NextResponse.json({blogs});
  }
}


//API endpoint for uploading blogs
export async function POST(request) {
  try {
    const formData = await request.formData();
    const timeStamp = Date.now();

    // Handle image upload
    const image = formData.get('image');
    if (!image) {
      return NextResponse.json({ success: false, message: 'No image provided' });
    }

    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);

    // Ensure the path is absolute for writing to the correct directory
    const uploadPath = path.join(process.cwd(), 'public', `${timeStamp}_${image.name}`);
    await writeFile(uploadPath, buffer);
    const imageUrl = `/${timeStamp}_${image.name}`;

    // Blog data creation
    const blogData = {
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
      author: formData.get('author'),
      image: imageUrl,
      authorImg: formData.get('authorImg'),
    };

    await BlogModel.create(blogData);
    return NextResponse.json({ success: true, message: 'Blog Added' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Error saving blog' });
  }
}


//API endpoint for deleting blog
export async function DELETE(request){
  const id = request.nextUrl.searchParams.get('id');
  const blog = await BlogModel.findById(id);
  fs.unlink(`./public${blog.image}`, ()=>{});
  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({message: 'Blog deleted'});
}












// export async function DELETE() {
//   try {
//     await BlogModel.deleteMany({});
//     return NextResponse.json({ message: 'All blogs deleted successfully' });
//   } catch (error) {
//     return NextResponse.json({ message: 'Failed to delete blogs', error: error.message }, { status: 500 });
//   }
// }
