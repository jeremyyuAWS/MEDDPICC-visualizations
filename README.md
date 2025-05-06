# MEDDPICC Qualification Agent

An AI-powered application to analyze meeting notes and extract MEDDPICC qualification data for sales professionals.

## Features

- **Meeting Notes Analysis**: Paste your meeting notes to get AI-powered MEDDPICC qualification scores
- **MEDDPICC Scorecard**: Detailed breakdown of MEDDPICC components with confidence scores
- **Enrichment Tags**: Automatically detect technologies, cloud providers, and compliance requirements
- **Follow-Up Generator**: AI-suggested follow-up questions and email drafts
- **HubSpot Integration**: Sync MEDDPICC scores and insights to HubSpot deals
- **Admin Panel**: Test and debug the Lyzr agent integration

## Database Schema

The application uses Supabase for data storage with the following structure:

### Tables

- **users**: Extends Supabase auth.users to store additional user information
- **meetings**: Stores meeting notes and metadata
- **analyses**: Stores MEDDPICC analysis results
- **meddpicc_components**: Stores individual MEDDPICC component scores and details
- **enrichment_tags**: Stores detected technologies, cloud providers, etc.
- **follow_up_questions**: Stores AI-generated follow-up questions

### Relationships

- A user can have many meetings
- A meeting can have one analysis
- An analysis can have many components, tags, and follow-up questions

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, Edge Functions)
- **AI**: Lyzr AI agent for MEDDPICC qualification

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Set up Supabase:
   - Create a new Supabase project
   - Run the SQL migrations in `supabase/migrations/`
   - Update `.env` with your Supabase credentials
4. Start the development server with `npm run dev`

## Environment Variables

Create a `.env` file with the following variables:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## License

MIT