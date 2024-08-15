# Image Processing Service with Multi-threading in JavaScript using NestJS

## Overview

This project demonstrates the use of JavaScript's multithreading capabilities, specifically leveraging `worker_threads`, in a NestJS application for processing images. The service allows users to upload multiple images, which are then processed (resized, blurred, and converted to different formats) concurrently using multithreading, significantly improving the performance and efficiency of the application.

## Showcase
![Screenshot from 2024-08-15 18-32-01](https://github.com/user-attachments/assets/b8967993-499b-4600-9652-16e4d7b45d61)


## Importance of Multithreading in JavaScript

### Why Multithreading?

JavaScript is traditionally single-threaded, which means it handles one operation at a time in a sequence. However, with the advent of modern JavaScript runtimes and the `worker_threads` module in Node.js, it's possible to perform tasks concurrently. Multithreading is crucial for resource-intensive operations such as image processing, large file handling, and complex computations because it allows you to utilize multiple CPU cores, reducing execution time and improving application responsiveness.

### How JavaScript Supports Multithreading

JavaScript, running in a Node.js environment, supports multithreading through the `worker_threads` module. This module allows developers to create separate threads of execution within the same process. Each thread runs independently, and the main thread can communicate with workers through messaging. This setup is ideal for handling CPU-bound tasks in parallel, making full use of multicore systems.

## Project Features

### Main Features

- **Customizable:** Users can select how many cors the process should use. This can help to visualize how multi-threading can improve performance.
- **Image Upload:** Users can upload multiple images in different formats.
- **Concurrent Image Processing:** The application processes images concurrently across multiple CPU cores, applying blur effects, resizing, and format conversion.
- **Customizable Processing:** Users can specify the level of blur, image dimensions, output format, and the number of CPU cores to use for processing.
- **Real-time Performance Tracking:** The application tracks the time taken for processing and the number of cores used, providing valuable insights into performance.

### Technical Overview

1. **NestJS Controller:** Handles incoming requests, manages file uploads, and delegates image processing tasks to worker threads.
2. **Worker Threads:** Each thread processes a subset of images, applying the specified transformations using the `sharp` library.
3. **EventEmitter:** Used for synchronizing the completion of all worker threads and returning the final response to the client.
4. **Helper Class:** Handles chunking of images based on the number of available CPU cores and saving processed images to disk.

### Folder Structure

- **Controller (`imgProcessing.controller.ts`):** Manages HTTP requests and delegates image processing to worker threads.
- **Service (`imgProcessing.service.ts`):** (Optional) If further abstraction is needed, services can handle business logic.
- **Helper (`imgProcessing.helper.ts`):** Contains utility functions for image chunking and saving processed images.
- **Worker (`worker/w.js`):** Worker thread script that processes images using the `sharp` library.
- **Pipes (`uploadFile.pipe.ts`):** Validates the uploaded files to ensure they are images.
- **Interfaces (`imgProcessing.interface.ts`):** Defines TypeScript interfaces for strongly typing the application’s data.

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- NestJS CLI (optional but recommended)
- `sharp` library for image processing

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/image-processing-service.git
    cd image-processing-service
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the application:
    ```bash
    npm run start:dev
    ```

### API Endpoints

- **GET /**: Renders the main landing page with information about available CPU cores.
- **POST /process**: Accepts image files and processing options, returns the time taken for processing and the number of CPU cores used.

### Example Request

```bash
curl -X POST http://localhost:3000/process \
  -F 'images=@/path/to/image1.jpg' \
  -F 'images=@/path/to/image2.png' \
  -F 'cors-level=4' \
  -F 'blur-level=2' \
  -F 'width=500' \
  -F 'height=500' \
  -F 'format=png'
```

## Conclusion

This project showcases how JavaScript(Typescript), traditionally single-threaded, can efficiently handle CPU-bound tasks like image processing using multithreading with worker threads. By leveraging NestJS's robust architecture, this application efficiently manages concurrent tasks, making it a powerful example of modern JavaScript capabilities.

This project is ideal for learning about multithreading in JavaScript, building performance-critical applications, and gaining experience with NestJS, making it a valuable addition to any developer's portfolio.
