# Personal Notes Manager

A full-stack web application for managing personal notes with OAuth authentication, built with Next.js 14, TypeScript, Tailwind CSS, and MongoDB.

## Features

- **OAuth Authentication**: Sign in with Google or GitHub
- **CRUD Operations**: Create, read, update, and delete notes
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Optimistic UI updates
- **Secure API**: Protected routes with session validation
- **Toast Notifications**: User feedback for all actions
- **Modern UI**: Clean dashboard with grid/list view toggle

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB (local or Atlas)
- Google OAuth credentials
- GitHub OAuth credentials (optional)

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd personal-notes-manager
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.local.example .env.local
\`\`\`

4. Configure your \`.env.local\` file with your credentials

### OAuth Setup

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: \`http://localhost:3000/api/auth/callback/google\`

#### GitHub OAuth
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL: \`http://localhost:3000/api/auth/callback/github\`

### Database Setup

#### Local MongoDB
\`\`\`bash
# Install MongoDB locally or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
\`\`\`

#### MongoDB Atlas
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a cluster
3. Get connection string and update \`MONGODB_URI\`

### Running the Application

1. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

2. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

\`\`\`
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/
│   │   └── notes/
│   ├── dashboard/
│   ├── login/
│   └── layout.tsx
├── components/
│   ├── ui/
│   ├── auth-provider.tsx
│   ├── navbar.tsx
│   ├── note-card.tsx
│   ├── note-form.tsx
│   └── delete-note-dialog.tsx
├── lib/
│   └── mongodb.ts
├── models/
│   ├── User.ts
│   └── Note.ts
└── middleware.ts
\`\`\`

## API Routes

- \`GET /api/notes\` - Get user's notes
- \`POST /api/notes\` - Create new note
- \`PUT /api/notes/[id]\` - Update note
- \`DELETE /api/notes/[id]\` - Delete note

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

Update \`NEXTAUTH_URL\` to your production domain:
\`\`\`env
NEXTAUTH_URL=https://your-domain.vercel.app
\`\`\`

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

MIT License - see LICENSE file for details
\`\`\`
