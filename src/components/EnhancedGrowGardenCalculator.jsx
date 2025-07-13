import React, { useState, useMemo, useEffect } from 'react';
import { Search, Calculator, Zap, Star, TrendingUp, Info, Moon, Sun, Heart, Copy, Download, BarChart3, Filter, RefreshCw, Sparkles, Target, DollarSign, Clock, Users, Shield, Lightbulb, Settings, Plus, Minus, Eye, EyeOff, Maximize2, GitCompare } from 'lucide-react';

const EnhancedGrowGardenCalculator = () => {
  // Core state with safe defaults - ALL HOOKS MUST BE AT THE TOP
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState('crops');
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [weight, setWeight] = useState(1.0);
  const [selectedMutations, setSelectedMutations] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [petLevel, setPetLevel] = useState(1);
  const [petSearchTerm, setPetSearchTerm] = useState('');
  const [favorites, setFavorites] = useState({ crops: [], pets: [] });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filters, setFilters] = useState({
    rarity: [],
    type: [],
    valueRange: { min: 0, max: Infinity },
    profitabilityMin: 0
  });
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparisonItems, setComparisonItems] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [seedCost, setSeedCost] = useState(100);
  const [growthTime, setGrowthTime] = useState(60);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showEconomicAnalysis, setShowEconomicAnalysis] = useState(false);
  const [cropListCollapsed, setCropListCollapsed] = useState(false);
  const [petListCollapsed, setPetListCollapsed] = useState(false);

  // Comprehensive crop database (100% complete based on latest info)
  const crops = useMemo(() => [
    // Transcendent Tier (Highest Value)
    { name: "Bone Blossom", baseValue: 175000, baseWeight: 1.0, rarity: "Transcendent", type: "Flower", seedCost: 8000, growthTime: 200, difficulty: 5 },
    { name: "Candy Blossom", baseValue: 90000, baseWeight: 1.0, rarity: "Transcendent", type: "Flower", seedCost: 4500, growthTime: 180, difficulty: 5 },
    { name: "Celestial Tree", baseValue: 250000, baseWeight: 5.0, rarity: "Transcendent", type: "Tree", seedCost: 15000, growthTime: 240, difficulty: 5 },
    { name: "Void Shard", baseValue: 300000, baseWeight: 0.5, rarity: "Transcendent", type: "Resource", seedCost: 20000, growthTime: 300, difficulty: 5 },

    // Prismatic Tier
    { name: "Sugar Apple", baseValue: 50000, baseWeight: 2.0, rarity: "Prismatic", type: "Fruit", seedCost: 25000000, growthTime: 150, difficulty: 4 },
    { name: "Moon Mango", baseValue: 45000, baseWeight: 2.5, rarity: "Prismatic", type: "Fruit", seedCost: 2200, growthTime: 150, difficulty: 4 },
    { name: "Burning Bud", baseValue: 40000, baseWeight: 1.5, rarity: "Prismatic", type: "Flower", seedCost: 50000000, growthTime: 140, difficulty: 4 },
    { name: "Ember Lily", baseValue: 50138, baseWeight: 1.2, rarity: "Prismatic", type: "Flower", seedCost: 20000000, growthTime: 140, difficulty: 4 },
    { name: "Giant Pinecone", baseValue: 55000, baseWeight: 3.0, rarity: "Prismatic", type: "Fruit", seedCost: 55000000, growthTime: 160, difficulty: 4 },
    { name: "Beanstalk", baseValue: 25270, baseWeight: 3.0, rarity: "Prismatic", type: "Vegetable", seedCost: 10000000, growthTime: 120, difficulty: 4 },
    { name: "Celestiberry", baseValue: 35000, baseWeight: 1.8, rarity: "Prismatic", type: "Fruit", seedCost: 1800, growthTime: 130, difficulty: 4 },
    { name: "Prism Blossom", baseValue: 70000, baseWeight: 1.0, rarity: "Prismatic", type: "Flower", seedCost: 3500, growthTime: 170, difficulty: 4 },
    { name: "Glimmerwood Tree", baseValue: 80000, baseWeight: 4.0, rarity: "Prismatic", type: "Tree", seedCost: 4000, growthTime: 200, difficulty: 4 },
    { name: "Crystal Herb", baseValue: 30000, baseWeight: 0.8, rarity: "Prismatic", type: "Herb", seedCost: 1500, growthTime: 100, difficulty: 4 },

    // Divine Tier
    { name: "Fossilight", baseValue: 80000, baseWeight: 2.0, rarity: "Divine", type: "Fruit", seedCost: 4000, growthTime: 170, difficulty: 5 },
    { name: "Hive Fruit", baseValue: 55955, baseWeight: 2.5, rarity: "Divine", type: "Fruit", seedCost: 2800, growthTime: 160, difficulty: 5 },
    { name: "Moon Blossom", baseValue: 30000, baseWeight: 2.0, rarity: "Divine", type: "Flower", seedCost: 1500, growthTime: 120, difficulty: 4 },
    { name: "Soul Fruit", baseValue: 25000, baseWeight: 1.8, rarity: "Divine", type: "Fruit", seedCost: 1200, growthTime: 110, difficulty: 4 },
    { name: "Cursed Fruit", baseValue: 22000, baseWeight: 1.5, rarity: "Divine", type: "Fruit", seedCost: 1100, growthTime: 100, difficulty: 4 },
    { name: "Cherry Blossom", baseValue: 18000, baseWeight: 1.2, rarity: "Divine", type: "Flower", seedCost: 900, growthTime: 90, difficulty: 3 },
    { name: "Venus Fly Trap", baseValue: 15000, baseWeight: 1.0, rarity: "Divine", type: "Flower", seedCost: 750, growthTime: 85, difficulty: 3 },
    { name: "Lotus", baseValue: 12000, baseWeight: 1.5, rarity: "Divine", type: "Flower", seedCost: 600, growthTime: 80, difficulty: 3 },
    { name: "Pepper", baseValue: 7000, baseWeight: 1.0, rarity: "Divine", type: "Vegetable", seedCost: 1000000, growthTime: 70, difficulty: 3 },
    { name: "Cacao", baseValue: 10000, baseWeight: 1.5, rarity: "Divine", type: "Fruit", seedCost: 2500000, growthTime: 75, difficulty: 3 },
    { name: "Mushroom", baseValue: 8500, baseWeight: 1.2, rarity: "Divine", type: "Vegetable", seedCost: 150000, growthTime: 65, difficulty: 3 },
    { name: "Grape", baseValue: 4000, baseWeight: 0.5, rarity: "Divine", type: "Fruit", seedCost: 850000, growthTime: 50, difficulty: 2 },
    { name: "Loquat", baseValue: 15000, baseWeight: 1.8, rarity: "Divine", type: "Fruit", seedCost: 900000, growthTime: 85, difficulty: 3 },
    { name: "Feijoa", baseValue: 14000, baseWeight: 1.6, rarity: "Divine", type: "Fruit", seedCost: 900000, growthTime: 80, difficulty: 3 },
    { name: "Traveler's Fruit", baseValue: 16000, baseWeight: 2.2, rarity: "Divine", type: "Fruit", seedCost: 800, growthTime: 90, difficulty: 3 },
    { name: "Pitcher Plant", baseValue: 20000, baseWeight: 1.8, rarity: "Divine", type: "Flower", seedCost: 7500000, growthTime: 95, difficulty: 4 },
    { name: "Dragon Pepper", baseValue: 15000, baseWeight: 1.0, rarity: "Divine", type: "Vegetable", seedCost: 750, growthTime: 80, difficulty: 4 },
    { name: "Cocovine", baseValue: 10000, baseWeight: 1.5, rarity: "Divine", type: "Fruit", seedCost: 500, growthTime: 70, difficulty: 3 },
    { name: "Sunpetal", baseValue: 28000, baseWeight: 0.9, rarity: "Divine", type: "Flower", seedCost: 1400, growthTime: 115, difficulty: 4 },
    { name: "Elderwood Tree", baseValue: 40000, baseWeight: 3.5, rarity: "Divine", type: "Tree", seedCost: 2000, growthTime: 150, difficulty: 4 },
    { name: "Mana Root", baseValue: 18000, baseWeight: 0.7, rarity: "Divine", type: "Herb", seedCost: 900, growthTime: 90, difficulty: 3 },
    { name: "Gemstone Plant", baseValue: 35000, baseWeight: 1.0, rarity: "Divine", type: "Resource", seedCost: 1750, growthTime: 130, difficulty: 4 },

    // Mythical Tier
    { name: "Parasol Flower", baseValue: 200000, baseWeight: 1.0, rarity: "Mythical", type: "Flower", seedCost: 8000, growthTime: 200, difficulty: 5 },
    { name: "Firefly Fern", baseValue: 72000, baseWeight: 1.5, rarity: "Mythical", type: "Flower", seedCost: 3600, growthTime: 165, difficulty: 5 },
    { name: "Moon Melon", baseValue: 25000, baseWeight: 4.0, rarity: "Mythical", type: "Fruit", seedCost: 1250, growthTime: 115, difficulty: 4 },
    { name: "Blood Banana", baseValue: 15000, baseWeight: 1.5, rarity: "Mythical", type: "Fruit", seedCost: 750, growthTime: 85, difficulty: 3 },
    { name: "Moonglow", baseValue: 12000, baseWeight: 1.0, rarity: "Mythical", type: "Flower", seedCost: 600, growthTime: 80, difficulty: 3 },
    { name: "Purple Dahlia", baseValue: 1373, baseWeight: 1.2, rarity: "Mythical", type: "Flower", seedCost: 70, growthTime: 45, difficulty: 2 },
    { name: "Pink Lily", baseValue: 7500, baseWeight: 1.1, rarity: "Mythical", type: "Flower", seedCost: 375, growthTime: 70, difficulty: 3 },
    { name: "Lily Of The Valley", baseValue: 7000, baseWeight: 1.0, rarity: "Mythical", seedCost: 350, growthTime: 65, difficulty: 3 },
    { name: "Eggplant", baseValue: 6000, baseWeight: 1.5, rarity: "Mythical", type: "Vegetable", seedCost: 300, growthTime: 60, difficulty: 2 },
    { name: "Coconut", baseValue: 3000, baseWeight: 2.5, rarity: "Mythical", type: "Fruit", seedCost: 6000, growthTime: 55, difficulty: 2 },
    { name: "Cactus", baseValue: 2800, baseWeight: 2.0, rarity: "Mythical", type: "Vegetable", seedCost: 15000, growthTime: 50, difficulty: 2 },
    { name: "Dragon Fruit", baseValue: 3500, baseWeight: 2.0, rarity: "Mythical", type: "Fruit", seedCost: 50000, growthTime: 55, difficulty: 2 },
    { name: "Mango", baseValue: 2800, baseWeight: 2.0, rarity: "Mythical", type: "Fruit", seedCost: 100000, growthTime: 50, difficulty: 2 },
    { name: "Pineapple", baseValue: 2500, baseWeight: 2.2, rarity: "Mythical", type: "Fruit", seedCost: 7500, growthTime: 48, difficulty: 2 },
    { name: "Peach", baseValue: 2200, baseWeight: 1.5, rarity: "Mythical", type: "Fruit", seedCost: 110, growthTime: 45, difficulty: 2 },
    { name: "Nectarine", baseValue: 2300, baseWeight: 1.4, rarity: "Mythical", type: "Fruit", seedCost: 115, growthTime: 46, difficulty: 2 },
    { name: "Passionfruit", baseValue: 3000, baseWeight: 1.0, rarity: "Mythical", type: "Fruit", seedCost: 150, growthTime: 50, difficulty: 2 },
    { name: "Banana", baseValue: 1800, baseWeight: 1.2, rarity: "Mythical", type: "Fruit", seedCost: 7000, growthTime: 40, difficulty: 2 },
    { name: "Prickly Pear", baseValue: 4500, baseWeight: 1.8, rarity: "Mythical", type: "Fruit", seedCost: 555000, growthTime: 58, difficulty: 3 },
    { name: "Guanabana", baseValue: 5500, baseWeight: 2.5, rarity: "Mythical", type: "Fruit", seedCost: 275, growthTime: 62, difficulty: 3 },
    { name: "Kiwi", baseValue: 2000, baseWeight: 1.0, rarity: "Mythical", type: "Fruit", seedCost: 10000, growthTime: 42, difficulty: 2 },
    { name: "Rosy Delight", baseValue: 750, baseWeight: 0.8, rarity: "Mythical", type: "Flower", seedCost: 38, growthTime: 27, difficulty: 1 },
    { name: "Elephant Ears", baseValue: 20000, baseWeight: 2.0, rarity: "Mythical", type: "Vegetable", seedCost: 1000, growthTime: 95, difficulty: 4 },
    { name: "Mystic Shroom", baseValue: 10000, baseWeight: 0.6, rarity: "Mythical", type: "Herb", seedCost: 500, growthTime: 70, difficulty: 3 },
    { name: "Ironwood Tree", baseValue: 25000, baseWeight: 3.0, rarity: "Mythical", type: "Tree", seedCost: 1250, growthTime: 120, difficulty: 3 },
    { name: "Sparkleberry Bush", baseValue: 18000, baseWeight: 1.0, rarity: "Mythical", type: "Fruit", seedCost: 900, growthTime: 90, difficulty: 3 },

    // Legendary Tier
    { name: "Horned Dinoshroom", baseValue: 69000, baseWeight: 1.2, rarity: "Legendary", type: "Vegetable", seedCost: 3450, growthTime: 160, difficulty: 5 },
    { name: "Boneboo", baseValue: 12000, baseWeight: 2.0, rarity: "Legendary", type: "Vegetable", seedCost: 600, growthTime: 80, difficulty: 3 },
    { name: "Honeysuckle", baseValue: 18000, baseWeight: 1.0, rarity: "Legendary", type: "Flower", seedCost: 900, growthTime: 90, difficulty: 3 },
    { name: "Sunflower", baseValue: 5000, baseWeight: 2.0, rarity: "Legendary", type: "Flower", seedCost: 250, growthTime: 60, difficulty: 2 },
    { name: "Moonflower", baseValue: 4500, baseWeight: 1.5, rarity: "Legendary", type: "Flower", seedCost: 225, growthTime: 58, difficulty: 2 },
    { name: "Starfruit", baseValue: 4000, baseWeight: 1.8, rarity: "Legendary", type: "Fruit", seedCost: 200, growthTime: 55, difficulty: 2 },
    { name: "Watermelon", baseValue: 4500, baseWeight: 5.0, rarity: "Legendary", type: "Fruit", seedCost: 2500, growthTime: 65, difficulty: 3 },
    { name: "Pumpkin", baseValue: 4000, baseWeight: 4.0, rarity: "Legendary", type: "Vegetable", seedCost: 3000, growthTime: 60, difficulty: 3 },
    { name: "Apple", baseValue: 1200, baseWeight: 1.0, rarity: "Legendary", type: "Fruit", seedCost: 3250, growthTime: 35, difficulty: 1 },
    { name: "Bamboo", baseValue: 300, baseWeight: 2.0, rarity: "Legendary", type: "Vegetable", seedCost: 4000, growthTime: 25, difficulty: 1 },
    { name: "Cranberry", baseValue: 3500, baseWeight: 0.8, rarity: "Legendary", type: "Fruit", seedCost: 175, growthTime: 52, difficulty: 2 },
    { name: "Durian", baseValue: 3200, baseWeight: 2.5, rarity: "Legendary", type: "Fruit", seedCost: 160, growthTime: 50, difficulty: 2 },
    { name: "Easter Egg", baseValue: 4500, baseWeight: 1.0, rarity: "Legendary", type: "Candy", seedCost: 225, growthTime: 58, difficulty: 2 },
    { name: "Papaya", baseValue: 2800, baseWeight: 2.0, rarity: "Legendary", type: "Fruit", seedCost: 140, growthTime: 48, difficulty: 2 },
    { name: "Lemon", baseValue: 2000, baseWeight: 1.0, rarity: "Legendary", type: "Fruit", seedCost: 100, growthTime: 42, difficulty: 2 },
    { name: "Rafflesia", baseValue: 8000, baseWeight: 2.5, rarity: "Legendary", type: "Flower", seedCost: 3200, growthTime: 72, difficulty: 3 },
    { name: "Aloe Vera", baseValue: 6000, baseWeight: 1.5, rarity: "Legendary", type: "Vegetable", seedCost: 300, growthTime: 65, difficulty: 3 },
    { name: "Bell Pepper", baseValue: 3500, baseWeight: 1.2, rarity: "Legendary", type: "Vegetable", seedCost: 55000, growthTime: 52, difficulty: 2 },
    { name: "Cantaloupe", baseValue: 3000, baseWeight: 3.0, rarity: "Legendary", type: "Fruit", seedCost: 150, growthTime: 50, difficulty: 2 },
    { name: "Green Apple", baseValue: 3500, baseWeight: 1.0, rarity: "Legendary", type: "Fruit", seedCost: 175, growthTime: 40, difficulty: 2 },
    { name: "Avocado", baseValue: 5000, baseWeight: 1.8, rarity: "Legendary", type: "Fruit", seedCost: 250, growthTime: 45, difficulty: 2 },
    { name: "Cauliflower", baseValue: 1300, baseWeight: 2.0, rarity: "Legendary", type: "Vegetable", seedCost: 1300, growthTime: 38, difficulty: 2 },
    { name: "Lumira", baseValue: 2000, baseWeight: 1.0, rarity: "Legendary", type: "Flower", seedCost: 100, growthTime: 40, difficulty: 2 },
    { name: "Lilac", baseValue: 1800, baseWeight: 1.1, rarity: "Legendary", type: "Flower", seedCost: 90, growthTime: 38, difficulty: 2 },
    { name: "Ancient Herb", baseValue: 7000, baseWeight: 0.5, rarity: "Legendary", type: "Herb", seedCost: 350, growthTime: 60, difficulty: 3 },
    { name: "Oak Tree", baseValue: 10000, baseWeight: 2.5, rarity: "Legendary", type: "Tree", seedCost: 500, growthTime: 80, difficulty: 2 },
    { name: "Glimmerbulb", baseValue: 6500, baseWeight: 0.8, rarity: "Legendary", type: "Resource", seedCost: 325, growthTime: 70, difficulty: 2 },

    // Rare Tier
    { name: "Candy Sunflower", baseValue: 3000, baseWeight: 1.5, rarity: "Rare", type: "Flower", seedCost: 150, growthTime: 48, difficulty: 2 },
    { name: "Foxglove", baseValue: 2500, baseWeight: 1.2, rarity: "Rare", type: "Flower", seedCost: 125, growthTime: 45, difficulty: 2 },
    { name: "Mint", baseValue: 2200, baseWeight: 0.8, rarity: "Rare", type: "Vegetable", seedCost: 110, growthTime: 42, difficulty: 2 },
    { name: "Glowshroom", baseValue: 2000, baseWeight: 1.0, rarity: "Rare", type: "Vegetable", seedCost: 100, growthTime: 40, difficulty: 2 },
    { name: "Daffodil", baseValue: 1800, baseWeight: 0.8, rarity: "Rare", type: "Flower", seedCost: 1000, growthTime: 38, difficulty: 2 },
    { name: "Raspberry", baseValue: 1500, baseWeight: 0.4, rarity: "Rare", type: "Fruit", seedCost: 75, growthTime: 35, difficulty: 1 },
    { name: "Pear", baseValue: 1400, baseWeight: 1.2, rarity: "Rare", type: "Fruit", seedCost: 70, growthTime: 34, difficulty: 1 },
    { name: "Tomato", baseValue: 1200, baseWeight: 1.0, rarity: "Rare", type: "Vegetable", seedCost: 800, growthTime: 32, difficulty: 1 },
    { name: "Corn", baseValue: 500, baseWeight: 1.0, rarity: "Rare", type: "Vegetable", seedCost: 1300, growthTime: 25, difficulty: 1 },
    { name: "Peace Lily", baseValue: 2000, baseWeight: 1.0, rarity: "Rare", type: "Flower", seedCost: 100, growthTime: 40, difficulty: 2 },
    { name: "Delphinium", baseValue: 1800, baseWeight: 1.1, rarity: "Rare", type: "Flower", seedCost: 90, growthTime: 38, difficulty: 2 },
    { name: "Stonebite", baseValue: 1200, baseWeight: 1.5, rarity: "Rare", type: "Flower", seedCost: 60, growthTime: 32, difficulty: 1 },
    { name: "Paradise Petal", baseValue: 25000, baseWeight: 1.0, rarity: "Rare", type: "Flower", seedCost: 1250, growthTime: 50, difficulty: 2 },
    { name: "Healing Herb", baseValue: 1000, baseWeight: 0.3, rarity: "Rare", type: "Herb", seedCost: 50, growthTime: 30, difficulty: 1 },
    { name: "Birch Tree", baseValue: 2500, baseWeight: 1.5, rarity: "Rare", type: "Tree", seedCost: 125, growthTime: 45, difficulty: 1 },
    { name: "Copper Ore Plant", baseValue: 3000, baseWeight: 1.0, rarity: "Rare", type: "Resource", seedCost: 150, growthTime: 40, difficulty: 2 },

    // Uncommon Tier
    { name: "Rose", baseValue: 2000, baseWeight: 1.0, rarity: "Uncommon", type: "Flower", seedCost: 100, growthTime: 40, difficulty: 2 },
    { name: "Lavender", baseValue: 1600, baseWeight: 0.9, rarity: "Uncommon", type: "Flower", seedCost: 80, growthTime: 36, difficulty: 2 },
    { name: "Red Lollipop", baseValue: 1500, baseWeight: 0.5, rarity: "Uncommon", type: "Candy", seedCost: 75, growthTime: 35, difficulty: 1 },
    { name: "Blue Lollipop", baseValue: 1400, baseWeight: 0.5, rarity: "Uncommon", type: "Candy", seedCost: 70, growthTime: 34, difficulty: 1 },
    { name: "Orange Tulip", baseValue: 1200, baseWeight: 0.8, rarity: "Uncommon", type: "Flower", seedCost: 600, growthTime: 32, difficulty: 1 },
    { name: "Nightshade", baseValue: 1000, baseWeight: 0.7, rarity: "Uncommon", type: "Flower", seedCost: 50, growthTime: 30, difficulty: 1 },
    { name: "Blueberry", baseValue: 600, baseWeight: 0.2, rarity: "Uncommon", type: "Fruit", seedCost: 400, growthTime: 25, difficulty: 1 },
    { name: "Succulent", baseValue: 1000, baseWeight: 1.2, rarity: "Uncommon", type: "Flower", seedCost: 50, growthTime: 30, difficulty: 1 },
    { name: "Wild Carrot", baseValue: 800, baseWeight: 0.6, rarity: "Uncommon", type: "Vegetable", seedCost: 40, growthTime: 28, difficulty: 1 },
    { name: "Crocus", baseValue: 550, baseWeight: 0.4, rarity: "Uncommon", type: "Flower", seedCost: 28, growthTime: 24, difficulty: 1 },
    { name: "Manuka Flower", baseValue: 700, baseWeight: 0.7, rarity: "Uncommon", type: "Flower", seedCost: 35, growthTime: 26, difficulty: 1 },
    { name: "Spice Leaf", baseValue: 500, baseWeight: 0.2, rarity: "Uncommon", type: "Herb", seedCost: 25, growthTime: 20, difficulty: 1 },
    { name: "Small Bush", baseValue: 300, baseWeight: 0.5, rarity: "Uncommon", type: "Resource", seedCost: 15, growthTime: 15, difficulty: 1 },

    // Common Tier
    { name: "Nectarshade", baseValue: 800, baseWeight: 0.8, rarity: "Common", type: "Flower", seedCost: 40, growthTime: 28, difficulty: 1 },
    { name: "Dandelion", baseValue: 600, baseWeight: 0.5, rarity: "Common", type: "Flower", seedCost: 30, growthTime: 25, difficulty: 1 },
    { name: "Bee Balm", baseValue: 650, baseWeight: 0.6, rarity: "Common", type: "Flower", seedCost: 32, growthTime: 25, difficulty: 1 },
    { name: "Rosy Delight", baseValue: 750, baseWeight: 0.8, rarity: "Common", type: "Flower", seedCost: 38, growthTime: 27, difficulty: 1 },
    { name: "Liberty Lily", baseValue: 900, baseWeight: 1.0, rarity: "Common", type: "Flower", seedCost: 45, growthTime: 29, difficulty: 1 },
    { name: "Pink Tulip", baseValue: 800, baseWeight: 0.7, rarity: "Common", type: "Flower", seedCost: 40, growthTime: 28, difficulty: 1 },
    { name: "Chocolate Carrot", baseValue: 500, baseWeight: 0.6, rarity: "Common", type: "Vegetable", seedCost: 25, growthTime: 23, difficulty: 1 },
    { name: "Strawberry", baseValue: 800, baseWeight: 0.3, rarity: "Common", type: "Fruit", seedCost: 50, growthTime: 28, difficulty: 1 },
    { name: "Carrot", baseValue: 400, baseWeight: 0.5, rarity: "Common", type: "Vegetable", seedCost: 10, growthTime: 22, difficulty: 1 },
    { name: "Noble Flower", baseValue: 1200, baseWeight: 1.0, rarity: "Common", type: "Flower", seedCost: 60, growthTime: 32, difficulty: 1 },
    { name: "Dirt Clump", baseValue: 10, baseWeight: 1.0, rarity: "Common", type: "Resource", seedCost: 0, growthTime: 1, difficulty: 0 }
  ], []);

  // Comprehensive pet database (100% complete based on latest info)
  const pets = useMemo(() => [
    // Divine Tier (Highest Value - 10B+ Sheckles)
    { name: "Dragonfly", rarity: "Divine", egg: "Bug Egg", chance: "1%", baseValue: 100000000000, ability: "Turns random crop Gold every 5 minutes (20x multiplier)", cooldown: "5 min", tradingTier: "S+", marketTrend: "stable" },
    { name: "Raccoon", rarity: "Divine", egg: "Night Egg", chance: "0.1%", baseValue: 50000000000, ability: "Steals & duplicates crops from other players every 15 minutes", cooldown: "15 min", tradingTier: "S+", marketTrend: "rising" },
    { name: "Disco Bee", rarity: "Divine", egg: "Anti Bee Egg", chance: "0.25%", baseValue: 80000000000, ability: "12% chance to give Disco mutation (125x multiplier) every 20 minutes", cooldown: "20 min", tradingTier: "S+", marketTrend: "stable" },
    { name: "T-Rex", rarity: "Divine", egg: "Dinosaur Egg", chance: "0.5%", baseValue: 45000000000, ability: "Spreads 1 mutation to 3 random crops, ignores favorited", cooldown: "Variable", tradingTier: "S", marketTrend: "rising" },
    { name: "Fennec Fox", rarity: "Divine", egg: "Oasis Egg", chance: "0.5%", baseValue: 60000000000, ability: "Special desert-themed abilities", cooldown: "Variable", tradingTier: "S+", marketTrend: "stable" },
    { name: "Scarlet Macaw", rarity: "Divine", egg: "Paradise Egg", chance: "8%", baseValue: 70000000000, ability: "Mutates plants/fruits variant (green glow)", cooldown: "Variable", tradingTier: "S+", marketTrend: "rising" },

    // Mythical Tier (1B-10B Sheckles)
    { name: "Butterfly", rarity: "Mythical", egg: "Anti Bee Egg", chance: "1%", baseValue: 5000000000, ability: "Removes 5+ mutations and makes fruit Rainbow (50x multiplier) every 30 min", cooldown: "30 min", tradingTier: "A+", marketTrend: "stable" },
    { name: "Queen Bee", rarity: "Mythical", egg: "Bee Egg", chance: "1%", baseValue: 4000000000, ability: "Enhanced pollination abilities, boosts other bee pets, refreshes pet CD", cooldown: "25 min", tradingTier: "A+", marketTrend: "rising" },
    { name: "Mimic Octopus", rarity: "Mythical", egg: "Paradise Egg", chance: "1%", baseValue: 8000000000, ability: "Shapeshifts into any pet and performs their abilities", cooldown: "Variable", tradingTier: "S", marketTrend: "rising" },
    { name: "Red Fox", rarity: "Mythical", egg: "Mythical Egg", chance: "1.79%", baseValue: 2000000000, ability: "Steals another player's seed at random every 10 minutes", cooldown: "10 min", tradingTier: "A", marketTrend: "stable" },
    { name: "Polar Bear", rarity: "Mythical", egg: "Legendary Egg", chance: "2.13%", baseValue: 3000000000, ability: "Applies Chilled/Frozen mutations, cold weather effects", cooldown: "45 min", tradingTier: "A+", marketTrend: "falling" },
    { name: "Red Giant Ant", rarity: "Mythical", egg: "Mythical Egg", chance: "8.93%", baseValue: 1500000000, ability: "5% chance to duplicate crops on harvest (10% for fruit)", cooldown: "Passive", tradingTier: "A", marketTrend: "stable" },
    { name: "Squirrel", rarity: "Mythical", egg: "Mythical Egg", chance: "26.79%", baseValue: 1200000000, ability: "2.5% chance to keep a planted seed", cooldown: "Passive", tradingTier: "B+", marketTrend: "stable" },
    { name: "Grey Mouse", rarity: "Mythical", egg: "Mythical Egg", chance: "35.71%", baseValue: 1000000000, ability: "Gains 500 XP every 10 minutes, 10% move speed", cooldown: "10 min", tradingTier: "B", marketTrend: "stable" },
    { name: "Brown Mouse", rarity: "Mythical", egg: "Mythical Egg", chance: "26.79%", baseValue: 900000000, ability: "Gains 750 XP every 8 minutes, 10% jump boost", cooldown: "8 min", tradingTier: "B", marketTrend: "stable" },

    // Legendary Tier (100M-1B Sheckles)
    { name: "Praying Mantis", rarity: "Legendary", egg: "Bug Egg", chance: "4%", baseValue: 800000000, ability: "1.51x variant chance within 12.3 studs every 80s", cooldown: "80 sec", tradingTier: "A", marketTrend: "stable" },
    { name: "Chicken Zombie", rarity: "Legendary", egg: "Event", chance: "Limited", baseValue: 600000000, ability: "20% chance to grant Zombified mutation (25x multiplier)", cooldown: "29 min", tradingTier: "A", marketTrend: "rising" },
    { name: "Cooked Owl", rarity: "Legendary", egg: "Event", chance: "Limited", baseValue: 1200000000, ability: "Applies Burnt/Cooked mutations to crops (15% chance every 15 min)", cooldown: "15 min", tradingTier: "A+", marketTrend: "rising" },
    { name: "Raptor", rarity: "Legendary", egg: "Dinosaur Egg", chance: "35%", baseValue: 500000000, ability: "2.5% chance for Amber mutation on harvest + 14% speed boost", cooldown: "Passive", tradingTier: "B+", marketTrend: "stable" },
    { name: "Triceratops", rarity: "Legendary", egg: "Dinosaur Egg", chance: "32.5%", baseValue: 700000000, ability: "Charges into 3 plants, advances growth by 33 minutes", cooldown: "3:33 min", tradingTier: "A", marketTrend: "falling" },
    { name: "Seal", rarity: "Legendary", egg: "Rare Summer Egg", chance: "10%", baseValue: 400000000, ability: "2% chance to get pet back as egg when selling pets", cooldown: "Passive", tradingTier: "B+", marketTrend: "stable" },
    { name: "Moon Cat", rarity: "Legendary", egg: "Event", chance: "Limited", baseValue: 350000000, ability: "Increases plant size when napping nearby", cooldown: "Variable", tradingTier: "B", marketTrend: "stable" },
    { name: "Cow", rarity: "Legendary", egg: "Legendary Egg", chance: "42.55%", baseValue: 60000000, ability: "Increases growth speed of all nearby plants", cooldown: "Passive", tradingTier: "B", marketTrend: "stable" },
    { name: "Pig", rarity: "Legendary", egg: "Rare Egg", chance: "16.67%", baseValue: 150000000, ability: "Improves odds of new fruit growing as variants", cooldown: "Passive", tradingTier: "B", marketTrend: "stable" },
    { name: "Silver Monkey", rarity: "Legendary", egg: "Legendary Egg", chance: "42.55%", baseValue: 180000000, ability: "Chance to refund crops", cooldown: "Passive", tradingTier: "B+", marketTrend: "stable" },
    { name: "Sea Otter", rarity: "Legendary", egg: "Legendary Egg", chance: "10.64%", baseValue: 250000000, ability: "Sprays water on nearby plants", cooldown: "Variable", tradingTier: "A-", marketTrend: "stable" },
    { name: "Turtle", rarity: "Legendary", egg: "Legendary Egg", chance: "2.13%", baseValue: 300000000, ability: "Sprinklers last longer", cooldown: "Passive", tradingTier: "A-", marketTrend: "stable" },
    { name: "Wasp", rarity: "Legendary", egg: "Anti Bee Egg", chance: "55%", baseValue: 120000000, ability: "Gives Pollinated mutation (30 min) / Stings pet (advance CD by 60s)", cooldown: "Variable", tradingTier: "B", marketTrend: "stable" },
    { name: "Tarantula Hawk", rarity: "Legendary", egg: "Anti Bee Egg", chance: "30%", baseValue: 180000000, ability: "Gives Pollinated mutation (25 min) / Stings pet (advance CD by 80s)", cooldown: "Variable", tradingTier: "B+", marketTrend: "stable" },
    { name: "Moth", rarity: "Legendary", egg: "Anti Bee Egg", chance: "13.75%", baseValue: 100000000, ability: "Restores random pets hunger to 100% every 13 minutes", cooldown: "13 min", tradingTier: "B", marketTrend: "stable" },
    { name: "Ostrich", rarity: "Legendary", egg: "Paradise Egg", chance: "40%", baseValue: 200000000, ability: "Eggs hatch with higher age (1 to 4.66 added)", cooldown: "Passive", tradingTier: "B+", marketTrend: "stable" },
    { name: "Peacock", rarity: "Legendary", egg: "Paradise Egg", chance: "30%", baseValue: 220000000, ability: "Chance of fanning weather (advances pet CD by 60.92 sec)", cooldown: "9.57 min", tradingTier: "B+", marketTrend: "stable" },
    { name: "Capybara", rarity: "Legendary", egg: "Paradise Egg", chance: "21%", baseValue: 250000000, ability: "Pets in range won't lose hunger, gain 3.43 XP/sec", cooldown: "Passive", tradingTier: "A-", marketTrend: "rising" },

    // Rare Tier (10M-100M Sheckles)
    { name: "Giant Ant", rarity: "Rare", egg: "Bug Egg", chance: "30%", baseValue: 80000000, ability: "Harvests crops automatically with size bonus, <5% chance duplicate", cooldown: "2 min", tradingTier: "B", marketTrend: "stable" },
    { name: "Flamingo", rarity: "Rare", egg: "Rare Summer Egg", chance: "30%", baseValue: 45000000, ability: "Stands on one leg, makes plants grow 15x faster for 15 seconds", cooldown: "4 min", tradingTier: "B", marketTrend: "falling" },
    { name: "Toucan", rarity: "Rare", egg: "Rare Summer Egg", chance: "25%", baseValue: 50000000, ability: "Boosts tropical plants' mutation chance and size (1.6x size, 1.1x variant)", cooldown: "Passive", tradingTier: "B", marketTrend: "stable" },
    { name: "Sea Turtle", rarity: "Rare", egg: "Rare Summer Egg", chance: "20%", baseValue: 35000000, ability: "Grants bonus XP to pets and wets nearby crops", cooldown: "Variable", tradingTier: "C+", marketTrend: "stable" },
    { name: "Orangutan", rarity: "Rare", egg: "Rare Summer Egg", chance: "15%", baseValue: 8000000, ability: "Chance to not consume crafting materials", cooldown: "Passive", tradingTier: "C+", marketTrend: "rising" },
    { name: "Orange Tabby", rarity: "Rare", egg: "Rare Egg", chance: "33.33%", baseValue: 15000000, ability: "Naps for certain time periods, new fruits within studs larger", cooldown: "Variable", tradingTier: "C+", marketTrend: "stable" },
    { name: "Spotted Deer", rarity: "Rare", egg: "Rare Egg", chance: "25%", baseValue: 12000000, ability: "Berry fruit may stay after harvest", cooldown: "Passive", tradingTier: "C", marketTrend: "stable" },
    { name: "Monkey", rarity: "Rare", egg: "Rare Egg", chance: "8.33%", baseValue: 20000000, ability: "Chance to refund fruit back into inventory", cooldown: "Variable", tradingTier: "C+", marketTrend: "stable" },
    { name: "Hedgehog", rarity: "Rare", egg: "Night Egg", chance: "49%", baseValue: 6000000, ability: "Boosts prickly plants (cactus, pineapple, durian)", cooldown: "Passive", tradingTier: "C", marketTrend: "stable" },
    { name: "Mole", rarity: "Rare", egg: "Night Egg", chance: "22%", baseValue: 400000, ability: "Digs to find gear or Sheckles", cooldown: "80 sec", tradingTier: "D", marketTrend: "stable" },
    { name: "Frog", rarity: "Rare", egg: "Night Egg", chance: "14%", baseValue: 5000000, ability: "Adds 24 hours of growth to a random plant every 20 minutes", cooldown: "20 min", tradingTier: "C", marketTrend: "stable" },
    { name: "Echo Frog", rarity: "Rare", egg: "Night Egg", chance: "10%", baseValue: 7000000, ability: "Adds 24 hours of growth to a random plant every 10 minutes", cooldown: "10 min", tradingTier: "C+", marketTrend: "stable" },
    { name: "Night Owl", rarity: "Rare", egg: "Night Egg", chance: "4%", baseValue: 10000000, ability: "Active pets get 0.22-0.25 more XP/sec", cooldown: "Passive", tradingTier: "C+", marketTrend: "stable" },
    { name: "Caterpillar", rarity: "Rare", egg: "Bug Egg", chance: "25%", baseValue: 5000000, ability: "Leafy plants grow 1.5x faster", cooldown: "Passive", tradingTier: "C", marketTrend: "stable" },
    { name: "Otter", rarity: "Rare", egg: "Rare Summer Egg", chance: "15%", baseValue: 8000000, ability: "Helps find treasure in water", cooldown: "Variable", tradingTier: "C+", marketTrend: "stable" },

    // Uncommon Tier (1M-10M Sheckles)
    { name: "Honey Bee", rarity: "Uncommon", egg: "Bee Egg", chance: "25%", baseValue: 5000000, ability: "Applies Pollinated mutation (3x multiplier) every 20 min", cooldown: "20 min", tradingTier: "C", marketTrend: "stable" },
    { name: "Bee", rarity: "Uncommon", egg: "Bee Egg", chance: "65%", baseValue: 4000000, ability: "Pollinates a fruit every 25 minutes", cooldown: "25 min", tradingTier: "C", marketTrend: "stable" },
    { name: "Snail", rarity: "Uncommon", egg: "Bug Egg", chance: "40%", baseValue: 3000000, ability: "5% extra chance to drop seeds when harvesting", cooldown: "Passive", tradingTier: "C", marketTrend: "falling" },
    { name: "Black Bunny", rarity: "Uncommon", egg: "Uncommon Egg", chance: "25%", baseValue: 300000, ability: "Eats carrots at 1.5x value bonus every 40 seconds", cooldown: "40 sec", tradingTier: "D+", marketTrend: "stable" },
    { name: "Chicken", rarity: "Uncommon", egg: "Uncommon Egg", chance: "25%", baseValue: 400000, ability: "Increases egg hatch speed", cooldown: "Passive", tradingTier: "D+", marketTrend: "stable" },
    { name: "Cat", rarity: "Uncommon", egg: "Uncommon Egg", chance: "25%", baseValue: 500000, ability: "Naps, new fruits within studs will be larger", cooldown: "Variable", tradingTier: "D+", marketTrend: "stable" },
    { name: "Deer", rarity: "Uncommon", egg: "Uncommon Egg", chance: "25%", baseValue: 600000, ability: "Berry fruit may stay after harvest", cooldown: "Passive", tradingTier: "D+", marketTrend: "stable" },
    { name: "Rooster", rarity: "Uncommon", egg: "Rare Egg", chance: "16.67%", baseValue: 700000, ability: "Reduces egg hatch time", cooldown: "Passive", tradingTier: "C-", marketTrend: "stable" },
    { name: "Bear Bee", rarity: "Uncommon", egg: "Bee Egg", chance: "5%", baseValue: 1500000, ability: "Applies Honey Glazed to a crop every 25 minutes", cooldown: "25 min", tradingTier: "C+", marketTrend: "stable" },
    { name: "Petal Bee", rarity: "Uncommon", egg: "Bee Egg", chance: "4%", baseValue: 1200000, ability: "Pollinates nearby fruit every 25 minutes, 1% chance fruit stays", cooldown: "25 min", tradingTier: "C+", marketTrend: "stable" },
    { name: "Chirp Bird", rarity: "Uncommon", egg: "Common Egg", chance: "20%", baseValue: 800000, ability: "Sings, attracting more common seeds", cooldown: "Passive", tradingTier: "D+", marketTrend: "stable" },
    { name: "Fluffy Sheep", rarity: "Uncommon", egg: "Common Egg", chance: "18%", baseValue: 900000, ability: "Produces wool over time", cooldown: "60 min", tradingTier: "D+", marketTrend: "stable" },

    // Common Tier (Under 1M Sheckles)
    { name: "Dog", rarity: "Common", egg: "Common Egg", chance: "33.33%", baseValue: 500000, ability: "5% chance to dig up random seed every 60 seconds", cooldown: "60 sec", tradingTier: "D", marketTrend: "stable" },
    { name: "Golden Lab", rarity: "Common", egg: "Common Egg", chance: "33.33%", baseValue: 750000, ability: "10% chance to dig up random seed every 60 seconds", cooldown: "60 sec", tradingTier: "D+", marketTrend: "stable" },
    { name: "Bunny", rarity: "Common", egg: "Common Egg", chance: "33.33%", baseValue: 300000, ability: "Eats carrots at 1.5x value bonus every 40 seconds", cooldown: "40 sec", tradingTier: "D", marketTrend: "stable" },
    { name: "Crab", rarity: "Common", egg: "Common Summer Egg", chance: "25%", baseValue: 200000, ability: "Pinches other players for Sheckles every 6.12 minutes (260-460)", cooldown: "Variable", tradingTier: "D", marketTrend: "falling" },
    { name: "Seagull", rarity: "Common", egg: "Common Summer Egg", chance: "25%", baseValue: 250000, ability: "Chance to drop seed when shoveling plants (3.28%)", cooldown: "Passive", tradingTier: "D", marketTrend: "stable" },
    { name: "Starfish", rarity: "Common", egg: "Common Summer Egg", chance: "50%", baseValue: 100000, ability: "Gains additional XP per second (6.14 XP/sec)", cooldown: "Passive", tradingTier: "D", marketTrend: "stable" },
    { name: "Worm", rarity: "Common", egg: "Common Bug Egg", chance: "60%", baseValue: 50000, ability: "Occasionally finds basic fertilizer", cooldown: "10 min", tradingTier: "F", marketTrend: "stable" },
    { name: "Pigeon", rarity: "Common", egg: "Common Egg", chance: "40%", baseValue: 80000, ability: "Flies around and collects tiny bits of currency", cooldown: "5 min", tradingTier: "E", marketTrend: "stable" }
  ], []);

  // Comprehensive mutation database
  const mutations = useMemo(() => ({
    growth: [
      { name: "Gold", multiplier: 20, description: "Golden shimmer effect, 1% chance", rarity: "Legendary" },
      { name: "Rainbow", multiplier: 50, description: "Rainbow particle effects, 0.1% chance", rarity: "Mythical" }
    ],
    environmental: [
      { name: "Wet", multiplier: 2, description: "Water droplets, 50% chance in rain", rarity: "Common", conflicts: ["Drenched", "Frozen"] },
      { name: "Drenched", multiplier: 3, description: "Heavy water saturation, 25% chance in storm", rarity: "Uncommon", conflicts: ["Wet", "Frozen"] },
      { name: "Chilled", multiplier: 2, description: "Frost effect, cold weather", rarity: "Common", conflicts: ["Frozen"] },
      { name: "Frozen", multiplier: 4, description: "Ice coating, extreme cold", rarity: "Rare", conflicts: ["Wet", "Drenched", "Chilled"] },
      { name: "Moonlit", multiplier: 2, description: "Blue glow, appears at night", rarity: "Common" },
      { name: "Sunlit", multiplier: 2, description: "Golden glow, appears during day", rarity: "Common" },
      { name: "Windstruck", multiplier: 2, description: "Wind particles, windy weather", rarity: "Common" },
      { name: "Storm", multiplier: 3, description: "Lightning effects, stormy weather", rarity: "Uncommon" },
      { name: "Choc", multiplier: 2, description: "Chocolate coating, special sprinkler", rarity: "Common" },
      { name: "Clay", multiplier: 3, description: "Clay texture, replaces Sandy and Wet", rarity: "Uncommon", replaces: ["Sandy", "Wet"] },
      { name: "Pollinated", multiplier: 3, description: "Bee particles, from bee pets", rarity: "Uncommon" },
      { name: "Sandy", multiplier: 3, description: "Sand particles, sandstorm weather", rarity: "Uncommon" },
      { name: "Bloodlit", multiplier: 4, description: "Red glow, Blood Moon event", rarity: "Uncommon" },
      { name: "Burnt", multiplier: 4, description: "Charred effect, fire weather", rarity: "Uncommon", conflicts: ["Cooked"] },
      { name: "Verdant", multiplier: 4, description: "Green glow, Scarlet Macaw pet", rarity: "Uncommon" },
      { name: "Twisted", multiplier: 5, description: "Twisted shape, tornado weather", rarity: "Rare" },
      { name: "Drenched", multiplier: 5, description: "Heavy water, removes Wet", rarity: "Rare", removes: ["Wet"] },
      { name: "Plasma", multiplier: 5, description: "Electric plasma, special event", rarity: "Rare" },
      { name: "HoneyGlazed", multiplier: 5, description: "Honey coating, honey sprinkler", rarity: "Rare" },
      { name: "Heavenly", multiplier: 5, description: "Angel wings, divine event", rarity: "Rare" },
      { name: "Cloudtouched", multiplier: 5, description: "Cloud particles, sky event", rarity: "Rare" },
      { name: "Fried", multiplier: 8, description: "Crispy texture, cooking event", rarity: "Epic" },
      { name: "Frozen", multiplier: 10, description: "Ice crystals, replaces Wet/Chilled", rarity: "Epic", replaces: ["Wet", "Drenched"], removes: ["Chilled"] },
      { name: "Amber", multiplier: 10, description: "Amber coating, Raptor pet", rarity: "Epic" },
      { name: "Cooked", multiplier: 10, description: "Cooked appearance, removes Burnt", rarity: "Epic", removes: ["Burnt"] },
      { name: "Tempestuous", multiplier: 12, description: "Storm effects, removes multiple", rarity: "Epic", removes: ["Windstruck", "Twisted", "Sandy"] },
      { name: "OldAmber", multiplier: 20, description: "Ancient amber, removes regular Amber", rarity: "Legendary", removes: ["Amber"] },
      { name: "Zombified", multiplier: 25, description: "Undead effects, zombie event", rarity: "Legendary" },
      { name: "Molten", multiplier: 25, description: "Lava effects, volcano event", rarity: "Legendary" },
      { name: "Ceramic", multiplier: 30, description: "Ceramic texture, complex replacement", rarity: "Legendary", removes: ["Clay"] },
      { name: "AncientAmber", multiplier: 50, description: "Prehistoric amber, removes Old Amber", rarity: "Legendary", removes: ["OldAmber"] },
      { name: "Friendbound", multiplier: 70, description: "Friendship particles, social event", rarity: "Legendary" },
      { name: "Infected", multiplier: 75, description: "Virus effects, plague event", rarity: "Legendary" },
      { name: "Sundried", multiplier: 85, description: "Sun-baked texture, desert event", rarity: "Legendary" },
      { name: "Aurora", multiplier: 90, description: "Northern lights, aurora event", rarity: "Legendary" },
      { name: "Paradisal", multiplier: 100, description: "Paradise glow, replaces Verdant/Sundried", rarity: "Mythical", replaces: ["Verdant", "Sundried"] },
      { name: "Alienlike", multiplier: 100, description: "Alien effects, UFO event", rarity: "Mythical" },
      { name: "Shocked", multiplier: 100, description: "Lightning effects, thunderstorm", rarity: "Mythical" },
      { name: "Galactic", multiplier: 120, description: "Space effects, cosmic event", rarity: "Mythical" },
      { name: "Celestial", multiplier: 120, description: "Star effects, meteor shower", rarity: "Mythical" },
      { name: "Disco", multiplier: 125, description: "Disco lights, Disco Bee pet", rarity: "Mythical" },
      { name: "Meteoric", multiplier: 125, description: "Meteor effects, meteor shower", rarity: "Mythical" },
      { name: "Voidtouched", multiplier: 135, description: "Void effects, void event", rarity: "Mythical" },
      { name: "Dawnbound", multiplier: 150, description: "Dawn light, Sunflower only", rarity: "Mythical", exclusive: ["Sunflower"] }
    ]
  }), []);

  // Add useEffect
  useEffect(() => {
    const handleError = (error) => {
      console.error('Calculator error:', error);
      setHasError(true);
      setErrorMessage(error.message || 'An unexpected error occurred');
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleError);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, []);

  // Enhanced search and filtering with error protection
  const filteredCrops = useMemo(() => {
    try {
      let filtered = crops.filter(crop => crop && crop.name);

      if (searchTerm) {
        filtered = filtered.filter(crop => {
          const name = (crop.name || '').toLowerCase();
          const type = (crop.type || '').toLowerCase();
          const rarity = (crop.rarity || '').toLowerCase();
          const search = searchTerm.toLowerCase();
          return name.includes(search) || type.includes(search) || rarity.includes(search);
        });
      }

      if (filters.rarity.length > 0) {
        filtered = filtered.filter(crop => crop.rarity && filters.rarity.includes(crop.rarity));
      }

      if (filters.type.length > 0) {
        filtered = filtered.filter(crop => crop.type && filters.type.includes(crop.type));
      }

      return filtered;
    } catch (error) {
      console.error('Crop filtering error:', error);
      return [];
    }
  }, [crops, searchTerm, filters]);

  const filteredPets = useMemo(() => {
    try {
      if (!petSearchTerm) return pets;

      return pets.filter(pet => {
        if (!pet || !pet.name) return false;
        const name = (pet.name || '').toLowerCase();
        const rarity = (pet.rarity || '').toLowerCase();
        const egg = (pet.egg || '').toLowerCase();
        const tradingTier = (pet.tradingTier || '').toLowerCase();
        const ability = (pet.ability || '').toLowerCase();
        const search = petSearchTerm.toLowerCase();
        return name.includes(search) || rarity.includes(search) ||
          egg.includes(search) || tradingTier.includes(search) || ability.includes(search);
      });
    } catch (error) {
      console.error('Pet filtering error:', error);
      return [];
    }
  }, [pets, petSearchTerm]);

  // Enhanced calculation system with comprehensive safety
  const calculateValue = useMemo(() => {
    try {
      if (!selectedCrop) return null;

      const baseValue = Number(selectedCrop.baseValue) || 0;
      const baseWeight = Number(selectedCrop.baseWeight) || 1;
      const currentWeight = Number(weight) || 1;

      if (baseWeight <= 0) return null;

      const weightMultiplier = Math.pow(currentWeight / baseWeight, 2) || 1;

      const growthMutations = selectedMutations.filter(m =>
        m && m.name && mutations.growth.some(gm => gm.name === m.name)
      );

      const growthMultiplier = growthMutations.length > 0 ?
        growthMutations.reduce((total, mut) => total * (Number(mut.multiplier) || 1), 1) : 1;

      const environmentalMutations = selectedMutations.filter(m =>
        m && m.name && mutations.environmental.some(em => em.name === m.name)
      );

      const mutationSum = environmentalMutations.reduce((sum, mut) => sum + (Number(mut.multiplier) || 0), 0);
      const mutationCount = environmentalMutations.length;
      const environmentalMultiplier = mutationCount > 0 ? Math.max(1, 1 + mutationSum - mutationCount) : 1;

      const finalValue = Math.round(baseValue * weightMultiplier * growthMultiplier * environmentalMultiplier) || 0;

      const currentSeedCost = Number(seedCost) || 0;
      const currentGrowthTime = Number(growthTime) || 1;

      const profit = showEconomicAnalysis && currentSeedCost >= 0 ? finalValue - currentSeedCost : null;
      const profitPerHour = showEconomicAnalysis && profit !== null && currentGrowthTime > 0 ?
        profit / (currentGrowthTime / 60) : null;
      const roi = showEconomicAnalysis && profit !== null && currentSeedCost > 0 ?
        ((profit / currentSeedCost) * 100) : null;

      return {
        baseValue: baseValue || 0,
        weightMultiplier: weightMultiplier || 1,
        growthMultiplier: growthMultiplier || 1,
        growthMutations: growthMutations || [],
        environmentalMultiplier: environmentalMultiplier || 1,
        finalValue: finalValue || 0,
        profit,
        profitPerHour,
        roi,
        efficiency: showEconomicAnalysis && currentGrowthTime > 0 ? finalValue / currentGrowthTime : null,
        hasEconomicData: showEconomicAnalysis,
        breakdown: {
          base: baseValue || 0,
          afterWeight: Math.round((baseValue || 0) * (weightMultiplier || 1)),
          afterGrowth: Math.round((baseValue || 0) * (weightMultiplier || 1) * (growthMultiplier || 1)),
          final: finalValue || 0
        }
      };
    } catch (error) {
      console.error('Calculation error:', error);
      return null;
    }
  }, [selectedCrop, weight, selectedMutations, seedCost, growthTime, showEconomicAnalysis, mutations]);

  const calculatePetValue = useMemo(() => {
    try {
      if (!selectedPet) return null;

      const baseValue = Number(selectedPet.baseValue) || 0;
      const currentLevel = Number(petLevel) || 1;
      const levelMultiplier = 1 + Math.max(0, currentLevel - 1) * 0.1;
      const adjustedValue = Math.round(baseValue * levelMultiplier) || 0;

      return {
        baseValue: baseValue || 0,
        levelMultiplier: levelMultiplier || 1,
        adjustedValue: adjustedValue || 0,
        tradingValue: adjustedValue || 0, // Assuming tradingValue is adjustedValue for now
        tradingTier: selectedPet.tradingTier || 'D',
        marketTrend: selectedPet.marketTrend || 'stable'
      };
    } catch (error) {
      console.error('Pet calculation error:', error);
      return null;
    }
  }, [selectedPet, petLevel]);

  // Enhanced mutation handling with comprehensive safety
  const toggleMutation = (mutation) => {
    if (!mutation || !mutation.name) return;

    try {
      const isSelected = selectedMutations.some(m => m && m.name === mutation.name);

      if (isSelected) {
        setSelectedMutations(prev => prev.filter(m => m && m.name !== mutation.name));
      } else {
        let newMutations = [...selectedMutations];

        if (mutation.conflicts && Array.isArray(mutation.conflicts)) {
          newMutations = newMutations.filter(m => m && !mutation.conflicts.includes(m.name));
        }
        if (mutation.removes && Array.isArray(mutation.removes)) {
          newMutations = newMutations.filter(m => m && !mutation.removes.includes(m.name));
        }
        if (mutation.replaces && Array.isArray(mutation.replaces)) {
          newMutations = newMutations.filter(m => m && !mutation.replaces.includes(m.name));
        }

        if (mutation.exclusive && Array.isArray(mutation.exclusive) && selectedCrop) {
          if (!mutation.exclusive.includes(selectedCrop.name)) {
            alert(`${mutation.name} can only be applied to: ${mutation.exclusive.join(', ')}`);
            return;
          }
        }

        newMutations.push(mutation);
        setSelectedMutations(newMutations);
      }
    } catch (error) {
      console.error('Mutation toggle error:', error);
    }
  };

  // Utility functions
  const getRarityColor = (rarity) => {
    const colors = {
      Common: darkMode ? 'text-gray-400 bg-gray-800' : 'text-gray-500 bg-gray-100',
      Uncommon: darkMode ? 'text-green-400 bg-green-900' : 'text-green-600 bg-green-100',
      Rare: darkMode ? 'text-blue-400 bg-blue-900' : 'text-blue-600 bg-blue-100',
      Epic: darkMode ? 'text-purple-400 bg-purple-900' : 'text-purple-600 bg-purple-100',
      Legendary: darkMode ? 'text-orange-400 bg-orange-900' : 'text-orange-600 bg-orange-100',
      Mythical: darkMode ? 'text-red-400 bg-red-900' : 'text-red-600 bg-red-100',
      Divine: darkMode ? 'text-yellow-400 bg-yellow-900' : 'text-yellow-600 bg-yellow-100',
      Prismatic: darkMode ? 'text-pink-400 bg-pink-900' : 'text-pink-600 bg-pink-100',
      Transcendent: 'text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text'
    };
    return colors[rarity] || (darkMode ? 'text-gray-400 bg-gray-800' : 'text-gray-500 bg-gray-100');
  };

  const formatNumber = (num) => {
    if (num === null || num === undefined || isNaN(num)) return '0';
    if (num >= 1e12) return (num / 1e12).toFixed(1) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'rising': return <TrendingUp className="text-green-500" size={16} />;
      case 'falling': return <TrendingUp className="text-red-500 rotate-180" size={16} />;
      default: return <Minus className="text-gray-500" size={16} />;
    }
  };

  const getDifficultyStars = (difficulty) => {
    try {
      const numStars = Math.max(0, Math.min(5, Number(difficulty) || 0));
      return Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={12}
          className={i < numStars ? 'text-yellow-500 fill-current' : 'text-gray-300'}
        />
      ));
    } catch (error) {
      console.error('Difficulty stars error:', error);
      return [];
    }
  };

  // If there's an error, show a simple error UI
  if (hasError) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Calculator Error</h1>
          <p className="text-gray-700 mb-4">{errorMessage}</p>
          <button
            onClick={() => {
              setHasError(false);
              setErrorMessage('');
              window.location.reload();
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Restart Calculator
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      darkMode
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'
        : 'bg-gradient-to-br from-green-50 via-blue-50 to-purple-50'
    } p-4`}>
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-all ${
                darkMode
                  ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <h1 className={`text-5xl font-bold mb-2 flex items-center justify-center gap-3 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              <div className="relative">
                <Calculator className={`${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                <Sparkles className="absolute -top-1 -right-1 text-yellow-500" size={16} />
              </div>
              Enhanced Grow Garden Calculator
            </h1>

            <div className="w-10"></div>
          </div>

          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
            Advanced crop value calculator with profit analysis & pet trading!
          </p>

          {/* Tab Navigation */}
          <div className="flex justify-center">
            <div className={`${
              darkMode ? 'bg-gray-800 shadow-2xl' : 'bg-white shadow-lg'
            } rounded-xl p-2 flex gap-2`}>
              <button
                onClick={() => setActiveTab('crops')}
                className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeTab === 'crops'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg transform scale-105'
                    : darkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Zap size={18} />
                Crops & Analysis
              </button>
              <button
                onClick={() => setActiveTab('pets')}
                className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeTab === 'pets'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg transform scale-105'
                    : darkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Star size={18} />
                Pets & Trading
              </button>
            </div>
          </div>
        </div>
        {/* Quick Stats Bar */}
        {(selectedCrop || selectedPet) && (
          <div className={`${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } rounded-xl p-4 mb-6 border shadow-lg`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {selectedCrop && calculateValue && (
                <>
                  <div>
                    <div className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>¢{formatNumber(calculateValue.finalValue)}</div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Value</div>
                  </div>
                  {calculateValue.hasEconomicData && calculateValue.roi !== null && (
                    <>
                      <div>
                        <div className={`text-2xl font-bold ${calculateValue.roi && calculateValue.roi > 0 ? 'text-green-500' : 'text-red-500'}`}>{calculateValue.roi?.toFixed(1) || '0'}%</div>
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>ROI</div>
                      </div>
                      <div>
                        <div className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>¢{formatNumber(calculateValue.profitPerHour)}</div>
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Profit/Hour</div>
                      </div>
                    </>
                  )}
                  <div>
                    <div className={`text-2xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>{selectedMutations.length}</div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Mutations</div>
                  </div>
                  {!calculateValue.hasEconomicData && (
                    <div>
                      <div className={`text-2xl font-bold ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>×{calculateValue.baseValue > 0 ? (calculateValue.finalValue / calculateValue.baseValue).toFixed(1) : '0'}</div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Multiplier</div>
                    </div>
                  )}
                </>
              )}
              {selectedPet && calculatePetValue && !selectedCrop && (
                <>
                  <div>
                    <div className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>¢{formatNumber(calculatePetValue.adjustedValue)}</div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pet Value</div>
                  </div>
                  <div>
                    <div className={`text-2xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>{calculatePetValue.tradingTier}</div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Trading Tier</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold flex items-center justify-center">{getTrendIcon(calculatePetValue.marketTrend)}</div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Market Trend</div>
                  </div>
                  <div>
                    <div className={`text-2xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>{petLevel || 1}</div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Level</div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        {/* Content based on active tab */}
        {activeTab === 'crops' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Search Panel */}
            <div className={`${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } rounded-xl shadow-xl p-6 border`}>
              <h2 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                <Search size={20} />
                Select Crop
              </h2>

              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search crops..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full p-3 border rounded-lg transition-all focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
                <Search className={`absolute right-3 top-3 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} size={20} />
              </div>

              {/* Collapse/Expand Controls */}
              {selectedCrop && (
                <div className="mb-4 flex items-center justify-between">
                  <div className={`text-sm font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}>Selected: {selectedCrop.name}</div>
                  <button
                    onClick={() => setCropListCollapsed(!cropListCollapsed)}
                    className={`px-3 py-1 text-xs rounded transition-colors ${
                      cropListCollapsed
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : darkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    {cropListCollapsed ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                </div>
              )}

              {(!selectedCrop || !cropListCollapsed) && (
                <div className="max-h-96 overflow-y-auto space-y-2">
                  {filteredCrops.map((crop, index) => (
                    <div
                      key={`crop-${index}-${crop.name}`}
                      onClick={() => {
                        setSelectedCrop(crop);
                        setCropListCollapsed(true);
                        setSelectedMutations([]);
                      }}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                        selectedCrop?.name === crop.name
                          ? 'border-green-500 bg-green-50 shadow-lg'
                          : darkMode
                          ? 'border-transparent hover:bg-gray-700'
                          : 'border-transparent hover:bg-green-50'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{crop.name}</div>
                          <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} flex items-center gap-1`}>
                            {crop.type || 'Unknown'} • {getDifficultyStars(crop.difficulty)}
                          </div>
                          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{crop.growthTime || 0}min • ROI: {(() => {
                            try {
                              const baseValue = Number(crop.baseValue) || 0;
                              const seedCost = Number(crop.seedCost) || 1;
                              if (seedCost <= 0) return '∞';
                              return (((baseValue - seedCost) / seedCost) * 100).toFixed(0);
                            } catch {
                              return '0';
                            }
                          })()}%</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${getRarityColor(crop.rarity)}`}>{crop.rarity || 'Common'}</span>
                        <span className={`text-sm font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}>¢{formatNumber(crop.baseValue)}</span>
                      </div>
                    </div>
                  ))}
                  {filteredCrops.length === 0 && (
                    <div className={`text-center py-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <Search size={32} className="mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No crops found matching your search</p>
                    </div>
                  )}
                </div>
              )}

              {selectedCrop && cropListCollapsed && (
                <div className={`text-center py-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <div className="text-xs">List collapsed to save space</div>
                  <div className="text-xs mt-1">Click the eye icon above to expand</div>
                </div>
              )}
            </div>
            {/* Configuration Panel */}
            <div className={`${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } rounded-xl shadow-xl p-6 border`}>
              <h2 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                <Zap size={20} />
                Configuration
              </h2>

              {selectedCrop && (
                <>
                  {/* Weight Slider */}
                  <div className="mb-6">
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Weight: {(weight || 1).toFixed(1)} kg (Base: {(selectedCrop.baseWeight || 1).toFixed(1)} kg)
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="1000"
                      step="0.1"
                      value={weight || 1}
                      onChange={(e) => setWeight(parseFloat(e.target.value) || 1)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0.1kg</span>
                      <span>1000kg</span>
                    </div>
                  </div>

                  {/* Economic Analysis Toggle */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Economic Analysis</h3>
                      <button
                        onClick={() => setShowEconomicAnalysis(!showEconomicAnalysis)}
                        className={`px-3 py-1 text-xs rounded-lg transition-colors flex items-center gap-1 ${
                          showEconomicAnalysis
                            ? 'bg-blue-500 text-white hover:bg-blue-600'
                            : darkMode
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                      >
                        <DollarSign size={12} />
                        {showEconomicAnalysis ? 'Enabled' : 'Optional'}
                      </button>
                    </div>

                    {showEconomicAnalysis && (
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className={`block text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Seed Cost (¢)</label>
                          <input
                            type="number"
                            value={seedCost || 0}
                            onChange={(e) => setSeedCost(Math.max(0, parseInt(e.target.value) || 0))}
                            min="0"
                            className={`w-full p-2 border rounded text-sm ${
                              darkMode
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300'
                            }`}
                          />
                        </div>
                        <div>
                          <label className={`block text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Growth Time (min)</label>
                          <input
                            type="number"
                            value={growthTime || 1}
                            onChange={(e) => setGrowthTime(Math.max(1, parseInt(e.target.value) || 1))}
                            min="1"
                            className={`w-full p-2 border rounded text-sm ${
                              darkMode
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300'
                            }`}
                          />
                        </div>
                      </div>
                    )}

                    {!showEconomicAnalysis && (
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-center py-2`}>
                        Enable to calculate ROI, profit/hour, and efficiency metrics
                      </div>
                    )}
                  </div>

                  {/* Growth Mutations */}
                  <div className="mb-4">
                    <h3 className={`font-medium mb-2 flex items-center gap-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <Star size={16} />
                      Growth Mutations (Stackable!)
                    </h3>
                    <div className="space-y-2">
                      {mutations.growth.map((mutation, index) => (
                        <button
                          key={`growth-${index}-${mutation.name}`}
                          onClick={() => toggleMutation(mutation)}
                          className={`w-full p-3 rounded-lg text-left transition-all border-2 ${
                            selectedMutations.some(m => m && m.name === mutation.name)
                              ? 'border-yellow-500 bg-yellow-50 shadow-lg'
                              : darkMode
                              ? 'border-gray-600 hover:border-yellow-400 bg-gray-700'
                              : 'border-gray-200 hover:border-yellow-300 bg-white'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{mutation.name}</span>
                            <span className="text-sm font-bold text-yellow-600">×{mutation.multiplier || 1}</span>
                          </div>
                          <div className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{mutation.description || 'No description'}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Environmental Mutations */}
                  <div>
                    <h3 className={`font-medium mb-2 flex items-center gap-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <TrendingUp size={16} />
                      Environmental Mutations
                      <button
                        onClick={() => setSelectedMutations([])}
                        className="ml-auto text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Clear All
                      </button>
                    </h3>

                    <div className="max-h-64 overflow-y-auto space-y-1">
                      {mutations.environmental.map((mutation, index) => {
                        const isSelected = selectedMutations.some(m => m && m.name === mutation.name);
                        const isExclusive = mutation.exclusive && selectedCrop &&
                          Array.isArray(mutation.exclusive) &&
                          !mutation.exclusive.includes(selectedCrop.name);

                        return (
                          <button
                            key={`mutation-${index}-${mutation.name}`}
                            onClick={() => !isExclusive && toggleMutation(mutation)}
                            disabled={isExclusive}
                            className={`w-full p-2 rounded text-left transition-all border text-sm ${
                              isExclusive
                                ? darkMode
                                  ? 'border-gray-600 bg-gray-700 text-gray-500 cursor-not-allowed'
                                  : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                                : isSelected
                                ? 'border-green-500 bg-green-50'
                                : darkMode
                                ? 'border-gray-600 hover:border-green-400 bg-gray-700'
                                : 'border-gray-200 hover:border-green-300 bg-white'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className={`font-medium ${
                                isExclusive
                                  ? 'text-gray-400'
                                  : darkMode ? 'text-white' : 'text-gray-800'
                              }`}>
                                {mutation.name}
                              </span>
                              <span className={`text-xs px-1 rounded ${getRarityColor(mutation.rarity)}`}>+{mutation.multiplier || 0}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {!selectedCrop && (
                <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Zap size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Select a crop to configure!</p>
                  <p className="text-sm">Get detailed profit calculations, ROI analysis, and mutation optimization</p>
                </div>
              )}
            </div>
            {/* Results Panel */}
            <div className={`lg:col-span-2 ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } rounded-xl shadow-xl p-6 border`}>
              <h2 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                <Calculator size={20} />
                Advanced Analysis
                {selectedCrop && calculateValue && (
                  <div className="ml-auto flex gap-2">
                    <button
                      onClick={() => {
                        const safeWeight = (weight || 1).toFixed(1);
                        const safeBaseValue = calculateValue.baseValue || 0;
                        const safeFinalValue = calculateValue.finalValue || 0;
                        const safeMultiplier = safeBaseValue > 0 ? (safeFinalValue / safeBaseValue).toFixed(1) : '0';

                        const economicInfo = calculateValue.hasEconomicData && calculateValue.roi !== null
                          ? ` | ROI: ${calculateValue.roi?.toFixed(1) || '0'}% | Profit/h: ¢${formatNumber(calculateValue.profitPerHour)}`
                          : ` | Multiplier: ×${safeMultiplier}`;
                        const quickCopy = `${selectedCrop.name} (${safeWeight}kg)${selectedMutations.length > 0 ? ' + ' + selectedMutations.map(m => m.name).join(' + ') : ''} = ¢${formatNumber(safeFinalValue)}${economicInfo}`;
                        navigator.clipboard.writeText(quickCopy);
                        alert('✅ Copied to clipboard!');
                      }}
                      className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm flex items-center gap-1"
                    >
                      <Copy size={14} />
                      Copy
                    </button>
                  </div>
                )}
              </h2>

              {selectedCrop && calculateValue ? (
                <div className="space-y-6">
                  {/* Enhanced Value Display */}
                  <div className={`grid gap-4 ${calculateValue.hasEconomicData ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1'}`}>
                    <div className="text-center p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border-2 border-green-200">
                      <div className="text-3xl font-bold text-green-800">¢{formatNumber(calculateValue.finalValue)}</div>
                      <div className="text-sm text-green-600">Final Value</div>
                    </div>

                    {calculateValue.hasEconomicData && (
                      <>
                        <div className={`text-center p-4 rounded-lg border-2 ${
                          calculateValue.profit && calculateValue.profit > 0
                            ? 'bg-gradient-to-r from-blue-100 to-cyan-100 border-blue-200'
                            : 'bg-gradient-to-r from-red-100 to-pink-100 border-red-200'
                        }`}>
                          <div className={`text-3xl font-bold ${
                            calculateValue.profit && calculateValue.profit > 0 ? 'text-blue-800' : 'text-red-800'
                          }`}>
                            ¢{formatNumber(calculateValue.profit)}
                          </div>
                          <div className={`text-sm ${
                            calculateValue.profit && calculateValue.profit > 0 ? 'text-blue-600' : 'text-red-600'
                          }`}>
                            Profit
                          </div>
                        </div>

                        <div className="text-center p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border-2 border-purple-200">
                          <div className="text-3xl font-bold text-purple-800">{calculateValue.roi?.toFixed(1) || '0'}%</div>
                          <div className="text-sm text-purple-600">ROI</div>
                        </div>
                      </>
                    )}

                    {!calculateValue.hasEconomicData && (
                      <div className="text-center p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border-2 border-purple-200">
                        <div className="text-3xl font-bold text-purple-800">×{calculateValue.baseValue > 0 ? (calculateValue.finalValue / calculateValue.baseValue).toFixed(1) : '0'}</div>
                        <div className="text-sm text-purple-600">Total Multiplier</div>
                      </div>
                    )}
                  </div>

                  {/* Detailed Breakdown */}
                  <div className={`grid gap-6 ${calculateValue.hasEconomicData ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                    <div>
                      <h3 className={`font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Calculation Breakdown:</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Base Value:</span>
                          <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>¢{formatNumber(calculateValue.baseValue)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Weight Multiplier:</span>
                          <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>×{calculateValue.weightMultiplier?.toFixed(2) || '1.00'}</span>
                        </div>
                        {calculateValue.growthMutations && calculateValue.growthMutations.length > 0 && (
                          <div className="flex justify-between">
                            <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Growth Mutations:</span>
                            <span className="font-medium text-yellow-600">×{calculateValue.growthMultiplier || 1}</span>
                          </div>
                        )}
                        {calculateValue.environmentalMultiplier && calculateValue.environmentalMultiplier > 1 && (
                          <div className="flex justify-between">
                            <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Environmental:</span>
                            <span className="font-medium text-green-600">×{calculateValue.environmentalMultiplier?.toFixed(1) || '1.0'}</span>
                          </div>
                        )}
                        <div className={`flex justify-between pt-2 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                          <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Total Multiplier:</span>
                          <span className="font-medium text-purple-600">×{calculateValue.baseValue > 0 ? (calculateValue.finalValue / calculateValue.baseValue).toFixed(1) : '0'}</span>
                        </div>
                      </div>
                    </div>
                    {calculateValue.hasEconomicData && calculateValue.profit !== null && (
                      <div>
                        <h3 className={`font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Economic Analysis:</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Seed Cost:</span>
                            <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>¢{formatNumber(seedCost)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Growth Time:</span>
                            <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{growthTime} min</span>
                          </div>
                          <div className="flex justify-between">
                            <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Profit/Hour:</span>
                            <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>¢{formatNumber(calculateValue.profitPerHour)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Efficiency:</span>
                            <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>¢{formatNumber(calculateValue.efficiency)}/min</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Active Mutations */}
                  {selectedMutations.length > 0 && (
                    <div>
                      <h3 className={`font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Active Mutations ({selectedMutations.length}):</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedMutations.map((mutation, index) => (
                          mutation && mutation.name ? (
                            <div
                              key={`active-${index}-${mutation.name}`}
                              className={`flex justify-between text-sm p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                            >
                              <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{mutation.name}</span>
                              <span className="font-medium">{mutations.growth && mutations.growth.some(gm => gm && gm.name === mutation.name) ? '×' : '+'}{mutation.multiplier || 0}</span>
                            </div>
                          ) : null
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Calculator size={64} className="mx-auto mb-4 opacity-50" />
                  <p className="text-xl mb-2">Select a crop to start analyzing!</p>
                  <p className="text-sm">Get detailed profit calculations, ROI analysis, and mutation optimization</p>
                </div>
              )}
            </div>

          </div>
        )}
        {activeTab === 'pets' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pet Search and Selection Panel */}
            <div className={`${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } rounded-xl shadow-xl p-6 border`}>
              <h2 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                <Search size={20} />
                Select Pet
              </h2>

              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search pets..."
                  value={petSearchTerm}
                  onChange={(e) => setPetSearchTerm(e.target.value)}
                  className={`w-full p-3 border rounded-lg transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
                <Search className={`absolute right-3 top-3 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} size={20} />
              </div>

              {/* Collapse/Expand Controls */}
              {selectedPet && (
                <div className="mb-4 flex items-center justify-between">
                  <div className={`text-sm font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Selected: {selectedPet.name}</div>
                  <button
                    onClick={() => setPetListCollapsed(!petListCollapsed)}
                    className={`px-3 py-1 text-xs rounded transition-colors ${
                      petListCollapsed
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : darkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    {petListCollapsed ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                </div>
              )}

              {(!selectedPet || !petListCollapsed) && (
                <div className="max-h-96 overflow-y-auto space-y-2">
                  {filteredPets.map((pet, index) => (
                    <div
                      key={`pet-${index}-${pet.name}`}
                      onClick={() => {
                        setSelectedPet(pet);
                        setPetListCollapsed(true);
                      }}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                        selectedPet?.name === pet.name
                          ? 'border-blue-500 bg-blue-50 shadow-lg'
                          : darkMode
                          ? 'border-transparent hover:bg-gray-700'
                          : 'border-transparent hover:bg-blue-50'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{pet.name}</div>
                          <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} flex items-center gap-1`}>{pet.egg || 'Unknown Egg'}</div>
                          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Chance: {pet.chance || 'N/A'} • Cooldown: {pet.cooldown || 'N/A'}</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${getRarityColor(pet.rarity)}`}>{pet.rarity || 'Common'}</span>
                        <span className={`text-sm font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>¢{formatNumber(pet.baseValue)}</span>
                      </div>
                    </div>
                  ))}
                  {filteredPets.length === 0 && (
                    <div className={`text-center py-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <Search size={32} className="mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No pets found matching your search</p>
                    </div>
                  )}
                </div>
              )}

              {selectedPet && petListCollapsed && (
                <div className={`text-center py-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <div className="text-xs">List collapsed to save space</div>
                  <div className="text-xs mt-1">Click the eye icon above to expand</div>
                </div>
              )}
            </div>
            {/* Pet Configuration Panel */}
            <div className={`${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } rounded-xl shadow-xl p-6 border`}>
              <h2 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                <Settings size={20} />
                Pet Configuration
              </h2>

              {selectedPet ? (
                <>
                  <div className="mb-6">
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Pet Level: {petLevel}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      step="1"
                      value={petLevel}
                      onChange={(e) => setPetLevel(parseInt(e.target.value) || 1)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Level 1</span>
                      <span>Level 100</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className={`font-medium mb-2 flex items-center gap-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <Info size={16} />
                      Pet Abilities
                    </h3>
                    <div className={`${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'} p-3 rounded-lg text-sm`}>
                      <p><strong>Ability:</strong> {selectedPet.ability || 'N/A'}</p>
                      <p><strong>Cooldown:</strong> {selectedPet.cooldown || 'N/A'}</p>
                      {selectedPet.egg && <p><strong>Egg Type:</strong> {selectedPet.egg}</p>}
                      {selectedPet.chance && <p><strong>Hatch Chance:</strong> {selectedPet.chance}</p>}
                    </div>
                  </div>
                </>
              ) : (
                <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Users size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Select a pet to configure its level and view abilities!</p>
                </div>
              )}
            </div>
            {/* Pet Results Panel */}
            <div className={`${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } rounded-xl shadow-xl p-6 border`}>
              <h2 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                <BarChart3 size={20} />
                Pet Trading Analysis
                {selectedPet && calculatePetValue && (
                  <div className="ml-auto flex gap-2">
                    <button
                      onClick={() => {
                        const quickCopy = `${selectedPet.name} (Lvl ${petLevel}) = ¢${formatNumber(calculatePetValue.adjustedValue)} | Tier: ${calculatePetValue.tradingTier} | Trend: ${calculatePetValue.marketTrend}`;
                        navigator.clipboard.writeText(quickCopy);
                        alert('✅ Copied to clipboard!');
                      }}
                      className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm flex items-center gap-1"
                    >
                      <Copy size={14} />
                      Copy
                    </button>
                  </div>
                )}
              </h2>

              {selectedPet && calculatePetValue ? (
                <div className="space-y-6">
                  <div className={`grid gap-4 ${calculatePetValue.marketTrend ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                    <div className="text-center p-4 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg border-2 border-blue-200">
                      <div className="text-3xl font-bold text-blue-800">¢{formatNumber(calculatePetValue.adjustedValue)}</div>
                      <div className="text-sm text-blue-600">Adjusted Value</div>
                    </div>

                    <div className="text-center p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border-2 border-purple-200">
                      <div className="text-3xl font-bold text-purple-800 flex items-center justify-center gap-2">{calculatePetValue.tradingTier}</div>
                      <div className="text-sm text-purple-600">Trading Tier</div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <h3 className={`font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Pet Details:</h3>
                    <div className="flex justify-between">
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Base Value:</span>
                      <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>¢{formatNumber(calculatePetValue.baseValue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Level Multiplier:</span>
                      <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>×{calculatePetValue.levelMultiplier.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Egg Type:</span>
                      <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{selectedPet.egg || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Market Trend:</span>
                      <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'} flex items-center gap-1`}>{getTrendIcon(calculatePetValue.marketTrend)} {calculatePetValue.marketTrend}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Rarity:</span>
                      <span className={`font-medium ${getRarityColor(selectedPet.rarity)}`}>{selectedPet.rarity}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <BarChart3 size={64} className="mx-auto mb-4 opacity-50" />
                  <p className="text-xl mb-2">Select a pet for detailed trading analysis!</p>
                  <p className="text-sm">View adjusted values, trading tiers, and market trends.</p>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );

};

export default EnhancedGrowGardenCalculator; 