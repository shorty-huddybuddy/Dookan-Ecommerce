# E-commerce Project

  

A modern e-commerce platform built with Next.js, Sanity CMS, Clerk authentication, and Stripe payments.

  

## Features

  

- User authentication with Clerk

- Product browsing and filtering

- Shopping cart management with Zustand

- Secure checkout with Stripe integration

- Cash on delivery payment option

- Order history and management

- Responsive design for all devices

- Admin dashboard for product management (Sanity Studio)

  

## Tech Stack

  

- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS

- **Database**: Sanity.io (Headless CMS)

- **Authentication**: Clerk

- **State Management**: Zustand

- **Payment Processing**: Stripe

- **Deployment**: Vercel

  

## Prerequisites

  

- Node.js (v18 or newer)

- npm or yarn

- Stripe account

- Clerk account

- Sanity account

  

## Setup Instructions

  

### Environment Variables

  

Create a `.env.local` file in the root directory with the following:

# Clerk Authentication

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

CLERK_SECRET_KEY=your_clerk_secret_key

CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

  

# Sanity

NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id

NEXT_PUBLIC_SANITY_DATASET=production

NEXT_PUBLIC_SANITY_API_VERSION=2025-03-12

SANITY_API_READ_TOKEN=your_sanity_read_token

SANITY_API_TOKEN=your_sanity_write_token

  

# Stripe

STRIPE_SECRET_KEY=your_stripe_secret_key

STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

  

# URLs

NEXT_PUBLIC_BASE_URL=http://localhost:3000

  
  
  

For production deployment on Vercel, add these variables to your Vercel project settings.

## Installation:
### 1. Clone the repository

```
git clone https://github.com/shorty-huddybuddy/Dookan-Ecommerce.git
cd Dookan-Ecommerce
```

### 2. Install dependencies
```
npm install
# or
yarn install
```

### 3. Set up Sanity schema

```
npm run typegen
```

### Running the Application
#### Development Mode:
```
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:3000

#### Production Build
```
npm run build
npm run start
# or
yarn build
yarn start
```

### Sanity Studio

The Sanity Studio is accessible at http://localhost:3000/studio
## Project Structure
```
/ecommerce/
├── actions/                   # Server actions for checkout
│   ├── createCheckoutSession.tsx
│   └── createCashOnDeliveryOrder.tsx
├── app/
│   ├── (store)/               # Main store routes
│   │   ├── basket/            # Shopping cart page
│   │   ├── orders/            # Order history page
│   │   ├── product/           # Product detail pages
│   │   ├── search/            # Search results page
│   │   ├── success/           # Order success page
│   │   ├── webhook/           # Webhook handler for Stripe
│   │   ├── layout.tsx         # Layout for store pages
│   │   ├── page.tsx           # Homepage
│   │   └── store.ts           # Zustand store configuration
│   └── studio/                # Sanity Studio routes
├── components/
│   └── ui/                    # UI components
├── lib/                       # Utility functions
│   ├── imgUrl.ts              # Image URL generation for Sanity
│   ├── stripe.ts              # Stripe configuration
│   └── utils.ts               # General utilities
├── public/                    # Static files
├── sanity/                    # Sanity configuration
│   ├── lib/                   # Sanity client setup
│   └── schemaTypes/           # Sanity schema definitions
│       ├── producttype.ts     # Product schema
│       ├── ordertype.ts       # Order schema
│       └── salestype.ts       # Sales/discount schema
└── .env.local                 # Environment variables
```

## API Routes
- `/api/draft-mode/enable` - Enable draft mode for Sanity
- `/api/draft-mode/disable` - Disable draft mode for Sanity
- `/webhook` - Stripe webhook endpoint


## Data Models

### Product

- Name, slug, description, price, stock quantity, image
- Category associations

### Order

- Customer details
- Products and quantities
- Payment information
- Status (pending, paid, shipped, delivered, cancelled)

### Sales/Discounts

- Discount amount
- Coupon codes
- Valid from/to dates

## Stripe Integration

The project includes:

- Checkout with Stripe
- Webhook handling for payment confirmations
- Order creation upon successful payment

## Webhook Configuration

For Stripe webhooks in production:

1. Use the primary domain URL: `https://ecommerce-dinesh.vercel.app/webhook`
2. Enable the checkout.session.completed event
3. Add the webhook secret to environment variables

## Important Notes

- Make sure to fix the oderNumber typo to orderNumber in the ordertype.ts and route.ts files
- When deploying to Vercel, ensure all environment variables are correctly set
- For local testing of Stripe webhooks, consider using the Stripe CLI

## Troubleshooting

### Common Issues

1. **Stripe Webhook Error**: Make sure the webhook secret is correctly set and the endpoint URL is correctly configured in the Stripe Dashboard.
    
2. **Database Access Issues**: Verify your Sanity API tokens have proper permissions.
    
3. **Authentication Problems**: Check Clerk configuration and ensure redirect URLs are properly set.
    
4. **Payment Processing Failures**: Verify Stripe configuration and check that product prices are properly formatted.
    

## License

This project is licensed under the MIT License.
