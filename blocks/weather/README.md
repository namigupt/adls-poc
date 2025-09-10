# Weather Block

A dynamic weather block that fetches current weather data and displays it as an attractive card component.

## Features

- **Real-time Weather Data**: Fetches current weather information from Weather.com API
- **Fallback Support**: Uses mock data when API is unavailable for demo purposes
- **Responsive Design**: Adapts to different screen sizes and devices
- **Beautiful UI**: Gradient card design with smooth animations
- **Comprehensive Data**: Shows temperature, weather description, humidity, wind speed, and pressure
- **Loading States**: Displays spinner while fetching data
- **Dark Theme Support**: Automatically adapts to user's color scheme preference
- **Accessibility**: Proper alt text and semantic HTML structure

## Usage

### Basic Usage

```html
<div class="weather">
    <div>London</div>
</div>
```

### Multiple Cities

```html
<div class="weather">
    <div>New York</div>
</div>

<div class="weather">
    <div>Tokyo</div>
</div>

<div class="weather">
    <div>Mumbai</div>
</div>
```

## Configuration

### API Key Setup

For production use, you'll need to:

1. Get an API key from [Weather.com API](https://www.ibm.com/products/weather-company-data-packages) (IBM Weather Company Data)
2. Replace the demo API key in `weather.js`:
   ```javascript
   const API_KEY = 'your-actual-api-key-here';
   ```
3. Consider proxying API calls through your backend for security

### Customization

#### Styling

The weather block can be customized by modifying `weather.css`:

- **Colors**: Change the gradient colors in `.weather-card`
- **Size**: Adjust the `max-width` in `.weather`
- **Spacing**: Modify padding and margins throughout
- **Animation**: Customize the `fadeInUp` animation or add new ones

#### Data Display

Modify the `displayWeatherData` function in `weather.js` to:
- Add more weather parameters
- Change temperature units
- Customize the layout
- Add additional API endpoints

## File Structure

```
blocks/weather/
├── weather.js          # Main block logic and API integration
├── weather.css         # Styling and responsive design
└── README.md          # This documentation
```

## Dependencies

- **AEM Scripts**: Uses the standard AEM block loading system
- **Weather.com API**: For real weather data (optional)
- **Modern Browser**: Requires ES6+ support for async/await

## Browser Support

- Chrome 55+
- Firefox 52+
- Safari 10.1+
- Edge 79+

## Demo

See `weather-demo.html` for a complete working example with multiple weather cards.

## API Information

### Weather.com API (IBM Weather Company Data)

- **Location Search Endpoint**: `https://api.weather.com/v1/location/search`
- **Weather Conditions Endpoint**: `https://api.weather.com/v1/location/{locationKey}/weather/conditions`
- **Parameters**: 
  - `query`: City name for location search
  - `apikey`: API key
  - `language`: Language code (e.g., en-US)
  - `format`: Response format (json)
- **Features**: 
  - Comprehensive weather data including narrative descriptions
  - Icon codes for weather conditions
  - Detailed atmospheric conditions
- **Documentation**: [IBM Weather Company Data API](https://www.ibm.com/products/weather-company-data-packages)

### Mock Data Fallback

When the API is unavailable, the block generates realistic mock data including:
- Random temperature (5-35°C)
- Random weather conditions
- Realistic humidity, wind, and pressure values

## Troubleshooting

### Common Issues

1. **No weather data showing**: Check browser console for API errors
2. **CORS errors**: API calls may need to be proxied through your backend
3. **Styling issues**: Ensure `weather.css` is properly loaded
4. **Block not loading**: Verify the AEM block loading system is working

### Debug Mode

Add this to your browser console to enable debug logging:
```javascript
localStorage.setItem('weather-debug', 'true');
```

## Contributing

When contributing to this block:

1. Follow the existing code style
2. Test on multiple devices and browsers
3. Update this README for any new features
4. Consider accessibility in all changes

## License

This weather block is part of the ADLS POC project and follows the same licensing terms.
