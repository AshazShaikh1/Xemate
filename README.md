# 🌤️ Eximate - Weather Dashboard

A modern, responsive weather application built with React and TypeScript. Get real-time weather information, forecasts, air quality data, and historical weather trends for any location worldwide.

![Dashboard]<img width="500" height="600" alt="dashboard" src="https://github.com/user-attachments/assets/98f47924-b011-4e31-a3de-e01483c5e530" />

## ✨ Features

- 🌍 **Real-time Weather Data** - Current conditions, temperature, humidity, wind speed, and more
- 📊 **5-Day Forecast** - Detailed weather predictions for the upcoming week
- 📈 **Hourly Temperature Charts** - Visual representation of temperature trends
- 📉 **Historical Data** - 7-day historical temperature analysis
- 🌬️ **Air Quality Index** - Real-time AQI with pollutant breakdown
- ⭐ **Favorite Cities** - Save and quickly access your favorite locations
- 🔍 **City Search** - Search and navigate to any city worldwide
- 🌓 **Dark/Light Mode** - Beautiful theme switching with smooth animations
- 🌡️ **Unit Toggle** - Switch between Celsius and Fahrenheit
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Modern UI/UX** - Smooth animations and micro-interactions

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router** - Client-side routing

### State Management & Data Fetching
- **TanStack Query (React Query)** - Server state management and data fetching
- **React Context API** - Theme and unit preferences

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Recharts** - Composable charting library
- **Sonner** - Toast notifications

### Utilities
- **date-fns** - Date formatting and manipulation
- **class-variance-authority** - Component variant management
- **cmdk** - Command palette component

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- OpenWeatherMap API key ([Get one here](https://openweathermap.org/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AshazShaikh1/Xemate/
   cd Eximate
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_OPENWEATHER_API_KEY=your_openweathermap_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 📖 Usage

### Viewing Current Weather

1. **Allow Location Access** - The app will request your location to show local weather
2. **View Dashboard** - See current conditions, hourly forecast, and detailed metrics
3. **Refresh Data** - Click the refresh button to update weather information

### Searching for Cities

1. **Click Search** - Use the search bar in the header
2. **Type City Name** - Start typing to see suggestions
3. **Select City** - Click on a city to view its weather details

### Managing Favorites

1. **Add to Favorites** - Click the star icon on any city page
2. **View Favorites** - See all favorite cities on the dashboard
3. **Remove Favorites** - Click the X button on any favorite city card

### Changing Units

- Click the **°C/°F** button in the header to toggle between metric and imperial units

### Theme Switching

- Click the **sun/moon** icon in the header to switch between light and dark themes

## 📁 Project Structure

```
src/
├── api/                 # API configuration and types
│   ├── config.ts       # API configuration
│   ├── types.ts        # TypeScript type definitions
│   └── weather.ts      # Weather API functions
├── components/
│   ├── weather/        # Weather-specific components
│   │   ├── current-weather.tsx
│   │   ├── air-quality.tsx
│   │   ├── weather-forecast.tsx
│   │   ├── weather-details.tsx
│   │   ├── hourly-temperature.tsx
│   │   ├── historical-chart.tsx
│   │   ├── favorite-cities.tsx
│   │   └── favorite-button.tsx
│   ├── ui/             # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── alert.tsx
│   │   ├── header.tsx
│   │   ├── city-search.tsx
│   │   └── ...
│   ├── layout.tsx      # Main layout component
│   └── loading-skeleton.tsx
├── context/            # React contexts
│   ├── theme-provider.tsx
│   └── unit-provider.tsx
├── hooks/              # Custom React hooks
│   ├── use-geolocation.tsx
│   ├── use-weather.ts
│   ├── use-favorite.tsx
│   └── ...
├── pages/              # Page components
│   ├── weather-dashboard.tsx
│   └── city.tsx
├── lib/                # Utility functions
│   └── utils.ts
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

## 🎨 Features Showcase

### Dashboard View
![Dashboard]<img width="100" height="100" alt="dashboard" src="https://github.com/user-attachments/assets/98f47924-b011-4e31-a3de-e01483c5e530" />

### City Details
![City Page]<img width="100" height="100" alt="citypage" src="https://github.com/user-attachments/assets/4585c9c7-afb2-44cf-826f-22933c5374c4" />

## 🏗️ Build

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🧪 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

### API Configuration

The app uses OpenWeatherMap API. Make sure to:
1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get your API key
3. Add it to `.env` file as `VITE_OPENWEATHER_API_KEY`

### Environment Variables

```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Ashaz Shaikh**

- Made with ❤️

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for weather data API
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Lucide](https://lucide.dev/) for beautiful icons
- [Recharts](https://recharts.org/) for charting capabilities

---

⭐ If you like this project, give it a star!
