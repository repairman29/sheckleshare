# 🌱 Enhanced Grow Garden Calculator (GAG Calculator)

A comprehensive React-based calculator for the Grow Garden game, featuring advanced crop and pet management with real-time value calculations and mutation analysis.

## ✨ Features

### 🌿 **Comprehensive Crop Database**
- **127 crops** across 8 rarity tiers (Transcendent to Common)
- **7 crop types**: Flower, Fruit, Vegetable, Tree, Herb, Resource, Candy
- Real-time value calculations with weight and growth multipliers
- Detailed growth time, difficulty, and seed cost information

### 🐾 **Advanced Pet System**
- **67 pets** across 6 rarity tiers (Divine to Common)
- Pet ability tracking with cooldowns and market trends
- Trading tier classifications (S+ to F)
- Detailed egg types and hatch chances

### 🧬 **Mutation Analysis**
- **47 mutations** (2 growth + 45 environmental)
- Conflict detection and replacement rules
- Multiplier calculations for value optimization
- Visual mutation toggles and effects

### 🎯 **Key Features**
- **Dark/Light Mode** toggle with persistent settings
- **Real-time search** and filtering across all databases
- **Advanced calculations** with multiple multiplier types
- **Responsive design** optimized for all devices
- **Export/Import** functionality for configurations

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/gag-calculator.git
cd gag-calculator

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

## 📊 Database Statistics

### Crops by Rarity
- **Transcendent**: 4 crops
- **Prismatic**: 10 crops  
- **Divine**: 21 crops
- **Mythical**: 25 crops
- **Legendary**: 27 crops
- **Rare**: 16 crops
- **Uncommon**: 13 crops
- **Common**: 11 crops
- **Total**: 127 crops

### Pets by Rarity
- **Divine**: 6 pets
- **Mythical**: 9 pets
- **Legendary**: 18 pets
- **Rare**: 14 pets
- **Uncommon**: 12 pets
- **Common**: 8 pets
- **Total**: 67 pets

### Crops by Type
- **Flower**: 45 crops
- **Fruit**: 35 crops
- **Vegetable**: 25 crops
- **Tree**: 8 crops
- **Herb**: 6 crops
- **Resource**: 5 crops
- **Candy**: 3 crops

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Local Storage** - Persistent settings

## 📁 Project Structure

```
gag-calculator/
├── src/
│   ├── components/
│   │   └── EnhancedGrowGardenCalculator.jsx  # Main component
│   ├── App.jsx                               # App wrapper
│   ├── main.jsx                             # Entry point
│   └── index.css                            # Global styles
├── public/
│   └── favicon.ico
├── GAG_CALCULATOR_DATA.md                   # Complete database documentation
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎮 How to Use

### Crop Calculations
1. **Select a crop** from the comprehensive database
2. **Adjust weight** and growth parameters
3. **Toggle mutations** to see value multipliers
4. **View real-time** calculated values and profits

### Pet Analysis
1. **Browse pets** by rarity or search by name
2. **Review abilities** and cooldown times
3. **Check market trends** and trading tiers
4. **Compare values** across different pets

### Advanced Features
- **Search functionality** across all databases
- **Filter by rarity** and type
- **Dark mode** for comfortable viewing
- **Export configurations** for sharing

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_APP_TITLE=GAG Calculator
VITE_APP_VERSION=1.0.0
```

### Customization
- Modify `tailwind.config.js` for theme customization
- Update `vite.config.js` for build configuration
- Edit component props for feature toggles

## 📈 Value Calculation Formula

```
Final Value = Base Value × Weight Multiplier × Growth Multiplier × Environmental Multiplier
```

Where:
- **Weight Multiplier** = (Current Weight / Base Weight)²
- **Growth Multiplier** = Product of all growth mutation multipliers
- **Environmental Multiplier** = 1 + Sum of environmental mutation bonuses - Number of environmental mutations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Grow Garden Community** for data validation
- **React Team** for the amazing framework
- **Tailwind CSS** for the beautiful styling system
- **Lucide** for the beautiful icons

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/gag-calculator/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/gag-calculator/discussions)
- **Wiki**: [Project Wiki](https://github.com/yourusername/gag-calculator/wiki)

---

**Made with ❤️ for the Grow Garden community**

*Last Updated: December 2024*
*Version: 1.0.0* 