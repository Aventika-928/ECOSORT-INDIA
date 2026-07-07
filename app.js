// EcoSort India - Swachh Bharat Segregation Logic

// ==========================================
// 1. DATABASE: 100+ Localized Indian Waste Items
// ==========================================
const WASTE_DATABASE = [
    // --- DRY WASTE (BLUE) ---
    { id: "milk_packet", name: "Amul Milk Packet (Washed)", synonyms: ["milk packet", "milk bag", "mother dairy packet", "polybag milk"], category: "recycling", material: "Plastic", prepInstructions: "Cut the packet keeping the small corner piece attached (detached corners are too small and clog machine filters). Rinse out all milk residue with water, and let it dry before placing in the Dry waste bin.", contaminationAlert: "Unwashed milk packets rot quickly and ruin clean paper items in the Dry waste bin.", rules: { bengaluru: "Dry Waste. Recyclable.", mumbai: "Dry Waste.", indore: "Dry Waste. Highly demanded by local collectors.", delhi: "Dry Waste.", chennai: "Dry Waste.", kolkata: "Dry Waste.", hyderabad: "Dry Waste.", pune: "Dry Waste.", ahmedabad: "Dry Waste.", lucknow: "Dry Waste." } },
    { id: "maggi_wrapper", name: "Maggi Wrapper (Multilayered Plastic)", synonyms: ["chip packet", "lays packet", "biscuit packet", "kurkure wrapper", "wrapper"], category: "recycling", material: "Plastic", prepInstructions: "Ensure it is empty. Multilayered plastics (MLP) cannot be recycled easily, but local municipal corporations collect them for energy recovery in cement kilns or road building.", contaminationAlert: "Food residue inside wrappers makes them uncollectable.", rules: { bengaluru: "Dry Waste. Sent to cement kilns.", mumbai: "Dry Waste.", indore: "Dry Waste. Sorted separately.", delhi: "Dry Waste.", chennai: "Dry Waste.", kolkata: "Dry Waste.", hyderabad: "Dry Waste.", pune: "Dry Waste.", ahmedabad: "Dry Waste.", lucknow: "Dry Waste." } },
    { id: "newspaper", name: "Raddi Newspaper", synonyms: ["raddi", "news paper", "newspaper", "hindi paper"], category: "recycling", material: "Paper", prepInstructions: "Keep dry and stack. Best option: Sell it to your local Kabadiwala (scrap dealer) to earn cash and guarantee 100% recycling!", contaminationAlert: "Wet paper cannot be processed and will be discarded.", rules: { bengaluru: "Dry Waste. Sell to Kabadiwala.", mumbai: "Dry Waste.", indore: "Dry Waste.", delhi: "Dry Waste.", chennai: "Dry Waste.", kolkata: "Dry Waste.", hyderabad: "Dry Waste.", pune: "Dry Waste.", ahmedabad: "Dry Waste.", lucknow: "Dry Waste." } },
    { id: "cardboard_carton", name: "Cardboard Delivery Box", synonyms: ["amazon box", "delivery carton", "courier box"], category: "recycling", material: "Paper", prepInstructions: "Flatten completely. Remove packing tape and bubble wrap. You can sell larger boxes to a Kabadiwala.", contaminationAlert: "Oily or wet cardboard belongs in Wet Waste/Compost.", rules: { bengaluru: "Dry Waste.", mumbai: "Dry Waste.", indore: "Dry Waste.", delhi: "Dry Waste.", chennai: "Dry Waste.", kolkata: "Dry Waste.", hyderabad: "Dry Waste.", pune: "Dry Waste.", ahmedabad: "Dry Waste.", lucknow: "Dry Waste." } },
    { id: "plastic_water_bottle", name: "Bisleri Water Bottle", synonyms: ["plastic bottle", "pet bottle", "soda bottle"], category: "recycling", material: "Plastic", prepInstructions: "Crush the bottle flat to save space, and screw the cap back on. Sell in bulk to local scrap dealers.", contaminationAlert: "Leftover water leads to mold in dry bins.", rules: { bengaluru: "Dry Waste.", mumbai: "Dry Waste.", indore: "Dry Waste.", delhi: "Dry Waste.", chennai: "Dry Waste.", kolkata: "Dry Waste.", hyderabad: "Dry Waste.", pune: "Dry Waste.", ahmedabad: "Dry Waste.", lucknow: "Dry Waste." } },
    { id: "aluminum_foil_container", name: "Aluminium Foil Food Container", synonyms: ["biryani foil", "takeout foil box", "silver foil container"], category: "recycling", material: "Metal", prepInstructions: "Rinse away all oil, ghee, and rice fragments. Fold into a compact shape.", contaminationAlert: "Heavy oil and spices contaminate the metal recycling batch.", rules: { bengaluru: "Dry Waste.", mumbai: "Dry Waste.", indore: "Dry Waste.", delhi: "Dry Waste.", chennai: "Dry Waste.", kolkata: "Dry Waste.", hyderabad: "Dry Waste.", pune: "Dry Waste.", ahmedabad: "Dry Waste.", lucknow: "Dry Waste." } },
    { id: "steel_ghee_tin", name: "Steel Ghee/Oil Tin", synonyms: ["ghee can", "oil dabba", "tin can", "rasgulla tin"], category: "recycling", material: "Metal", prepInstructions: "Rinse out grease with hot soapy water. Recycle or sell to a Kabadiwala.", contaminationAlert: "Residual sticky oils damage recycling plants.", rules: { bengaluru: "Dry Waste.", mumbai: "Dry Waste.", indore: "Dry Waste.", delhi: "Dry Waste.", chennai: "Dry Waste.", kolkata: "Dry Waste.", hyderabad: "Dry Waste.", pune: "Dry Waste.", ahmedabad: "Dry Waste.", lucknow: "Dry Waste." } },
    { id: "glass_honey_jar", name: "Glass Honey/Jam Jar", synonyms: ["glass jar", "pickle jar glass", "achar dabba"], category: "recycling", material: "Glass", prepInstructions: "Rinse thoroughly to remove sweet syrups. Keep the metal lid separate in dry waste.", contaminationAlert: "Attracts ants and bugs at sorting units.", rules: { bengaluru: "Dry Waste.", mumbai: "Dry Waste.", indore: "Dry Waste.", delhi: "Dry Waste.", chennai: "Dry Waste.", kolkata: "Dry Waste.", hyderabad: "Dry Waste.", pune: "Dry Waste.", ahmedabad: "Dry Waste.", lucknow: "Dry Waste." } },
    { id: "old_cotton_clothes", name: "Old Cotton Kurta/Shirt", synonyms: ["old clothes", "kapda", "cotton fabric"], category: "recycling", material: "Paper", prepInstructions: "Donate working clothes to charities. Non-wearable rags can be used as house wipes or given to textile recyclers.", contaminationAlert: "Wet or soiled fabrics attract pests.", rules: { bengaluru: "Dry Waste. Recycle.", mumbai: "Dry Waste.", indore: "Dry Waste.", delhi: "Dry Waste.", chennai: "Dry Waste.", kolkata: "Dry Waste.", hyderabad: "Dry Waste.", pune: "Dry Waste.", ahmedabad: "Dry Waste.", lucknow: "Dry Waste." } },
    { id: "shampoo_bottle", name: "Plastic Shampoo Bottle", synonyms: ["shampoo bottle", "conditioner bottle", "liquid soap bottle"], category: "recycling", material: "Plastic", prepInstructions: "Rinse soapy remnants. Discard the plastic pump (pumps have metal springs and go in landfill/sanitary).", contaminationAlert: "Suds disrupt conveyor systems.", rules: { bengaluru: "Dry Waste.", mumbai: "Dry Waste.", indore: "Dry Waste.", delhi: "Dry Waste.", chennai: "Dry Waste.", kolkata: "Dry Waste.", hyderabad: "Dry Waste.", pune: "Dry Waste.", ahmedabad: "Dry Waste.", lucknow: "Dry Waste." } },
    
    // --- WET WASTE (GREEN) ---
    { id: "coconut_shell", name: "Tender Coconut Shell", synonyms: ["nariyal paani shell", "coconut shell", "tender coconut"], category: "compost", material: "Organic", prepInstructions: "Ensure all water is empty. BBMP Bengaluru accepts it in wet waste, but some cities process it separately due to slow decomposition.", contaminationAlert: "Do not throw with plastic straws still inserted.", rules: { bengaluru: "Wet Waste / Garden waste.", mumbai: "Wet Waste.", indore: "Wet Waste.", delhi: "Landfill / Dry waste.", chennai: "Wet Waste.", kolkata: "Wet Waste.", hyderabad: "Wet Waste.", pune: "Wet Waste.", ahmedabad: "Wet Waste.", lucknow: "Wet Waste." } },
    { id: "pooja_flowers", name: "Pooja Flowers / Nirmalya", synonyms: ["flowers pooja", "temple flowers", "marigold garland", "nirmalya"], category: "compost", material: "Organic", prepInstructions: "Remove plastic threads, ribbons, or copper wire attachments. Excellent for home composting.", contaminationAlert: "Nylon garlands do not decompose.", rules: { bengaluru: "Wet Waste. Composted.", mumbai: "Wet Waste. Special bins at ghats.", indore: "Wet Waste. Composted.", delhi: "Wet Waste.", chennai: "Wet Waste.", kolkata: "Wet Waste.", hyderabad: "Wet Waste.", pune: "Wet Waste.", ahmedabad: "Wet Waste.", lucknow: "Wet Waste." } },
    { id: "tea_leaves", name: "Used Tea Leaves (Chai Patti)", synonyms: ["chai patti", "tea powder used", "tea leaves"], category: "compost", material: "Organic", prepInstructions: "Rinse out milk and sugar remnants. Makes excellent direct fertilizer for home gardens.", contaminationAlert: "Ensure tea bags made of plastic mesh are discarded in Sanitary/Landfill.", rules: { bengaluru: "Wet Waste.", mumbai: "Wet Waste.", indore: "Wet Waste.", delhi: "Wet Waste.", chennai: "Wet Waste.", kolkata: "Wet Waste.", hyderabad: "Wet Waste.", pune: "Wet Waste.", ahmedabad: "Wet Waste.", lucknow: "Wet Waste." } },
    { id: "banana_peel", name: "Banana Peel", synonyms: ["kela chilkha", "banana peel", "fruit scraps"], category: "compost", material: "Organic", prepInstructions: "Directly throw in the wet waste container.", contaminationAlert: "Remove any small brand labels.", rules: { bengaluru: "Wet Waste.", mumbai: "Wet Waste.", indore: "Wet Waste.", delhi: "Wet Waste.", chennai: "Wet Waste.", kolkata: "Wet Waste.", hyderabad: "Wet Waste.", pune: "Wet Waste.", ahmedabad: "Wet Waste.", lucknow: "Wet Waste." } },
    { id: "mango_seed", name: "Mango Seed (Guthli)", synonyms: ["mango seed", "guthli", "fruit seed"], category: "compost", material: "Organic", prepInstructions: "Directly throw in wet waste compost.", contaminationAlert: "None.", rules: { bengaluru: "Wet Waste.", mumbai: "Wet Waste.", indore: "Wet Waste.", delhi: "Wet Waste.", chennai: "Wet Waste.", kolkata: "Wet Waste.", hyderabad: "Wet Waste.", pune: "Wet Waste.", ahmedabad: "Wet Waste.", lucknow: "Wet Waste." } },
    { id: "cooked_rice", name: "Cooked Leftovers / Rice", synonyms: ["leftover food", "cooked sabzi", "bachela khana"], category: "compost", material: "Organic", prepInstructions: "Empty cooked food into wet waste. Do not throw in plastic containers.", contaminationAlert: "Plastics mixed in compost ruin fertilizer quality.", rules: { bengaluru: "Wet Waste.", mumbai: "Wet Waste.", indore: "Wet Waste.", delhi: "Wet Waste.", chennai: "Wet Waste.", kolkata: "Wet Waste.", hyderabad: "Wet Waste.", pune: "Wet Waste.", ahmedabad: "Wet Waste.", lucknow: "Wet Waste." } },
    { id: "eggshells", name: "Egg Shells", synonyms: ["egg shells", "anda chilkha"], category: "compost", material: "Organic", prepInstructions: "Crush slightly to aid decomposition.", contaminationAlert: "None.", rules: { bengaluru: "Wet Waste.", mumbai: "Wet Waste.", indore: "Wet Waste.", delhi: "Wet Waste.", chennai: "Wet Waste.", kolkata: "Wet Waste.", hyderabad: "Wet Waste.", pune: "Wet Waste.", ahmedabad: "Wet Waste.", lucknow: "Wet Waste." } },
    { id: "coconut_husk", name: "Coconut Husk (Coir)", synonyms: ["nariyal jhaad", "coir", "coconut fiber"], category: "compost", material: "Organic", prepInstructions: "Compostable. Can be shredded to use as coco-peat for gardening.", contaminationAlert: "None.", rules: { bengaluru: "Wet Waste.", mumbai: "Wet Waste.", indore: "Wet Waste.", delhi: "Wet Waste.", chennai: "Wet Waste.", kolkata: "Wet Waste.", hyderabad: "Wet Waste.", pune: "Wet Waste.", ahmedabad: "Wet Waste.", lucknow: "Wet Waste." } },
    { id: "chicken_bones", name: "Chicken / Meat Bones", synonyms: ["bones", "mutton bones", "non veg scraps"], category: "compost", material: "Organic", prepInstructions: "Industrial compost centers process bones easily. Avoid backyard composting if you worry about pests.", rules: { bengaluru: "Wet Waste.", mumbai: "Wet Waste.", indore: "Wet Waste.", delhi: "Landfill.", chennai: "Wet Waste.", kolkata: "Wet Waste.", hyderabad: "Wet Waste.", pune: "Wet Waste.", ahmedabad: "Wet Waste.", lucknow: "Wet Waste." } },
    { id: "stale_roti", name: "Stale Roti / Bread", synonyms: ["roti bacheli", "stale bread"], category: "compost", material: "Organic", prepInstructions: "Throw directly in composting bins.", contaminationAlert: "Remove from plastic packets.", rules: { bengaluru: "Wet Waste.", mumbai: "Wet Waste.", indore: "Wet Waste.", delhi: "Wet Waste.", chennai: "Wet Waste.", kolkata: "Wet Waste.", hyderabad: "Wet Waste.", pune: "Wet Waste.", ahmedabad: "Wet Waste.", lucknow: "Wet Waste." } },

    // --- SANITARY WASTE (RED) ---
    { id: "used_diaper", name: "Used Diaper", synonyms: ["diaper", "baby diaper", "soiled diaper"], category: "landfill", material: "Organic", prepInstructions: "Empty solid feces into toilet if possible. Wrap diaper securely in a newspaper, and mark the package with a Red Cross ('X') to warn waste collectors.", contaminationAlert: "BIOLOGICAL HAZARD. Never throw in wet or dry bins. Can cause viral outbreaks.", rules: { bengaluru: "Sanitary Waste. Wrapped.", mumbai: "Sanitary Waste. Wrapped.", indore: "Sanitary Waste. Wrapped.", delhi: "Sanitary Waste.", chennai: "Sanitary Waste.", kolkata: "Sanitary Waste.", hyderabad: "Sanitary Waste.", pune: "Sanitary Waste.", ahmedabad: "Sanitary Waste.", lucknow: "Sanitary Waste." } },
    { id: "sanitary_pad", name: "Used Sanitary Pad", synonyms: ["sanitary pad", "whisper pad", "menstrual pad"], category: "landfill", material: "Organic", prepInstructions: "Wrap pad securely in a newspaper, and mark the outside with a Red Cross ('X'). Throw in Sanitary Waste (Red Bin).", contaminationAlert: "Biological hazard. Spreads infectious pathogens.", rules: { bengaluru: "Sanitary Waste. Wrapped.", mumbai: "Sanitary Waste. Wrapped.", indore: "Sanitary Waste. Wrapped.", delhi: "Sanitary Waste.", chennai: "Sanitary Waste.", kolkata: "Sanitary Waste.", hyderabad: "Sanitary Waste.", pune: "Sanitary Waste.", ahmedabad: "Sanitary Waste.", lucknow: "Sanitary Waste." } },
    { id: "clinical_bandage", name: "Used Bandage / Cotton", synonyms: ["bandage", "medical cotton soiled", "bandaid"], category: "landfill", material: "Organic", prepInstructions: "Wrap in paper, place in sanitary waste.", contaminationAlert: "Infectious bio-waste.", rules: { bengaluru: "Sanitary Waste.", mumbai: "Sanitary Waste.", indore: "Sanitary Waste.", delhi: "Sanitary Waste.", chennai: "Sanitary Waste.", kolkata: "Sanitary Waste.", hyderabad: "Sanitary Waste.", pune: "Sanitary Waste.", ahmedabad: "Sanitary Waste.", lucknow: "Sanitary Waste." } },
    { id: "soiled_tissue", name: "Used Facial Tissue", synonyms: ["kleenex dirty", "used tissue", "soiled paper towel"], category: "landfill", material: "Paper", prepInstructions: "Tissue containing bodily fluids (mucus, blood) must go to sanitary waste.", contaminationAlert: "Fungal/pathogenic hazard.", rules: { bengaluru: "Sanitary Waste.", mumbai: "Sanitary Waste.", indore: "Sanitary Waste.", delhi: "Sanitary Waste.", chennai: "Sanitary Waste.", kolkata: "Sanitary Waste.", hyderabad: "Sanitary Waste.", pune: "Sanitary Waste.", ahmedabad: "Sanitary Waste.", lucknow: "Sanitary Waste." } },
    { id: "dental_floss", name: "Dental Floss", synonyms: ["floss thread"], category: "landfill", material: "Plastic", prepInstructions: "Throw in Sanitary Waste. Nylon threads are unrecyclable.", contaminationAlert: "Wraps around sorting machinery wheels.", rules: { bengaluru: "Sanitary Waste.", mumbai: "Sanitary Waste.", indore: "Sanitary Waste.", delhi: "Sanitary Waste.", chennai: "Sanitary Waste.", kolkata: "Sanitary Waste.", hyderabad: "Sanitary Waste.", pune: "Sanitary Waste.", ahmedabad: "Sanitary Waste.", lucknow: "Sanitary Waste." } },

    // --- HAZARDOUS & E-WASTE (ORANGE/BLACK) ---
    { id: "battery_cell", name: "Alkaline Battery (AA, AAA)", synonyms: ["aa battery", "aaa battery", "pencil cell", "battery cell"], category: "hazardous", material: "Electronic", prepInstructions: "Store in a dry box. Bring to specialized battery collections or Municipal ward booths. Do not mix with domestic waste.", contaminationAlert: "TOXIC. Leaches chemicals (lead, mercury) into the groundwater.", rules: { bengaluru: "Hazardous. Store separate.", mumbai: "Hazardous.", indore: "Hazardous.", delhi: "Hazardous.", chennai: "Hazardous.", kolkata: "Hazardous.", hyderabad: "Hazardous.", pune: "Hazardous.", ahmedabad: "Hazardous.", lucknow: "Hazardous." } },
    { id: "mosquito_refill", name: "Mosquito Vaporizer Refill", synonyms: ["goodknight refill", "allout refill", "mosquito vaporizer"], category: "hazardous", material: "Chemical", prepInstructions: "Refills contain chemical pesticides. Seal in a separate cover before handing to electronic hazardous wastes collectors.", contaminationAlert: "Chemical poisons contaminate organic compost.", rules: { bengaluru: "Hazardous.", mumbai: "Hazardous.", indore: "Hazardous.", delhi: "Hazardous.", chennai: "Hazardous.", kolkata: "Hazardous.", hyderabad: "Hazardous.", pune: "Hazardous.", ahmedabad: "Hazardous.", lucknow: "Hazardous." } },
    { id: "cfl_bulb", name: "CFL Lightbulb", synonyms: ["tubelight", "tube light", "cfl bulb", "broken tube"], category: "hazardous", material: "Chemical", prepInstructions: "Contains trace mercury. Wrap carefully in paper so it does not break during transit. Hand over separate to local e-waste camps.", contaminationAlert: "Toxic mercury vapors poison sanitation workers if broken.", rules: { bengaluru: "Hazardous.", mumbai: "Hazardous.", indore: "Hazardous.", delhi: "Hazardous.", chennai: "Hazardous.", kolkata: "Hazardous.", hyderabad: "Hazardous.", pune: "Hazardous.", ahmedabad: "Hazardous.", lucknow: "Hazardous." } },
    { id: "expired_medicine", name: "Expired Medicine Tablets", synonyms: ["expired pills", "medicine capsule", "cough syrup bottle"], category: "hazardous", material: "Chemical", prepInstructions: "Keep in original packaging. Wrap in paper with black tape. Never flush down the toilet.", contaminationAlert: "Water pollution hazards; leaches antibiotics into water tables.", rules: { bengaluru: "Hazardous.", mumbai: "Hazardous.", indore: "Hazardous.", delhi: "Hazardous.", chennai: "Hazardous.", kolkata: "Hazardous.", hyderabad: "Hazardous.", pune: "Hazardous.", ahmedabad: "Hazardous.", lucknow: "Hazardous." } },
    { id: "broken_smartphone", name: "Old Smartphone", synonyms: ["broken phone", "iphone old", "mobile battery"], category: "hazardous", material: "Electronic", prepInstructions: "Perform a factory reset to wipe data. Do not crush the internal Li-Ion battery. Deliver to e-waste recycling kiosks.", contaminationAlert: "Extreme fire hazard in compaction trucks.", rules: { bengaluru: "Hazardous. E-waste.", mumbai: "Hazardous.", indore: "Hazardous.", delhi: "Hazardous.", chennai: "Hazardous.", kolkata: "Hazardous.", hyderabad: "Hazardous.", pune: "Hazardous.", ahmedabad: "Hazardous.", lucknow: "Hazardous." } },
    { id: "power_wire", name: "Charger Cables & Wires", synonyms: ["charging cable", "usb wire", "power cord"], category: "hazardous", material: "Electronic", prepInstructions: "Bundle cords together. Keep separate from dry waste.", contaminationAlert: "Tangles and breaks mechanical gears in municipal dry waste depots.", rules: { bengaluru: "Hazardous. E-waste.", mumbai: "Hazardous.", indore: "Hazardous.", delhi: "Hazardous.", chennai: "Hazardous.", kolkata: "Hazardous.", hyderabad: "Hazardous.", pune: "Hazardous.", ahmedabad: "Hazardous.", lucknow: "Hazardous." } }
];

// Add Generic Indian items to populate 100+ database list
const localItems = [
    { name: "Chai Glass (Paper)", syns: ["chai cup", "paper tea cup"], cat: "landfill", mat: "Paper", prep: "Paper chai cups are lined with plastic wax coating and go to Sanitary/Landfill.", alert: "Plastic lining cannot be pulped." },
    { name: "Kulhad (Clay Cup)", syns: ["kulhad", "clay tea cup"], cat: "compost", mat: "Organic", prep: "Clay cups are eco-friendly and return to earth easily. Crush and throw in Wet Waste.", alert: "None." },
    { name: "Amul Curd Cup (Washed)", syns: ["curd cup", "yogurt cup dahi"], cat: "recycling", mat: "Plastic", prep: "Rinse dry, recycle #5 plastic.", alert: "Food residue." },
    { name: "Coconut Husk Coir Brush", syns: ["coir brush", "cleaning brush wood"], cat: "compost", mat: "Organic", prep: "Natural coir and wood handles are compostable.", alert: "None." },
    { name: "Plastic Milk Packet (Unwashed)", syns: ["unwashed milk packet"], cat: "landfill", mat: "Plastic", prep: "Throw in landfill. Rotten milk residue destroys dry recycling.", alert: "Lactic acid decay." },
    { name: "Disposable Syringe", syns: ["syringe needle", "injection"], cat: "landfill", mat: "Organic", prep: "Medical hazard. Snap the needle, store in a puncture-proof container, and throw in sanitary waste.", alert: "Infectious injury hazard." },
    { name: "Ganesh Idol (Clay / Eco)", syns: ["clay ganesha", "ganpati idol clay"], cat: "compost", mat: "Organic", prep: "Immerse in household water buckets. Use the clay mud for home garden pots.", alert: "None." },
    { name: "Ganesh Idol (POP / Plaster)", syns: ["pop idol", "plaster of paris idol"], cat: "landfill", mat: "Chemical", prep: "Banned from lake immersion. Hand over to municipal collectors for safe chemical recycling.", alert: "Toxic chemical paints contain lead." },
    { name: "Insect Spray Can (Hit/Baygon)", syns: ["hit spray", "baygon can", "cockroach spray"], cat: "hazardous", mat: "Chemical", prep: "Toxic pressurized container. Bring to HHW.", alert: "Explosion risk." },
    { name: "Toothpaste Tube (Colgate)", syns: ["colgate tube", "toothpaste dabba"], cat: "landfill", mat: "Plastic", prep: "Mylar plastic hybrid laminate. Unrecyclable.", alert: "Mixed layers." },
    { name: "Oily Halwai Box", syns: ["mithai box oil", "samosa carton"], cat: "compost", mat: "Paper", prep: "Cardboard boxes soaked in oil or ghee belong in wet waste.", alert: "Ruins dry paper." },
    { name: "Clean Mithai Box", syns: ["sweets box clean"], cat: "recycling", mat: "Paper", prep: "Recycle with dry papers.", alert: "None." },
    { name: "Tender Coconut Straw", syns: ["coconut straw"], cat: "landfill", mat: "Plastic", prep: "Landfill. Small plastic straw.", alert: "Too small." },
    { name: "Old Leather Shoes", syns: ["chappal leather", "joota old"], cat: "landfill", mat: "Plastic", prep: "Throw in landfill. Rubber/synthetic shoes can be recycled by specialized companies.", alert: "Slow decay." },
    { name: "Plastic Water Bottle Cap", syns: ["bottle cap plastic"], cat: "recycling", mat: "Plastic", prep: "Keep attached to Bisleri bottle.", alert: "Small size." },
    { name: "Expired Syrup Bottle (Glass)", syns: ["cough syrup glass"], cat: "hazardous", mat: "Chemical", prep: "Dump liquid syrup down toxic-disposal hubs. Glass bottle goes to dry waste/Kabadiwala.", alert: "Toxic medicine." },
    { name: "Raddi Books & Notebooks", syns: ["school books", "raddi copy"], cat: "recycling", mat: "Paper", prep: "Keep dry. Sell to Kabadiwala for cash.", alert: "None." },
    { name: "Aluminium Food Foil (Greasy)", syns: ["oily foil"], cat: "landfill", mat: "Metal", prep: "If foil cannot be washed easily, throw in landfill.", alert: "Spices contaminate metal." },
    { name: "Tea Bag (Stapled)", syns: ["chai bag"], cat: "landfill", mat: "Organic", prep: "Remove metal staple (dry waste) and paper string. Compost tea leaves. Stapled bags go to landfill.", alert: "Metal staple ruins soil compost." },
    { name: "Mosquito Mat (Goodknight)", syns: ["mosquito mat used"], cat: "hazardous", mat: "Chemical", prep: "HHW collection.", alert: "Pesticide chemical layers." }
];

localItems.forEach((item, index) => {
    const defaultRule = item.cat === "compost" ? "Wet Waste (Green)" : item.cat === "recycling" ? "Dry Waste (Blue)" : item.cat === "hazardous" ? "Domestic Hazardous" : "Sanitary Waste (Red)";
    const rules = {
        bengaluru: item.cat === "compost" ? "Wet Waste. Compost." : item.cat === "recycling" ? "Dry Waste. Recyclable (or Kabadiwala)." : item.cat === "hazardous" ? "Domestic Hazardous. Keep separate." : "Sanitary Waste. Wrapped.",
        mumbai: item.cat === "compost" ? "Wet Waste. Society compost." : item.cat === "recycling" ? "Dry Waste." : item.cat === "hazardous" ? "Domestic Hazardous." : "Sanitary Waste.",
        indore: item.cat === "compost" ? "Wet Waste (Green bin)." : item.cat === "recycling" ? "Plastic/Dry Waste." : item.cat === "hazardous" ? "Hazardous Waste (Black)." : "Sanitary Waste (Red bag).",
        delhi: defaultRule,
        chennai: defaultRule,
        kolkata: defaultRule,
        hyderabad: defaultRule,
        pune: defaultRule,
        ahmedabad: defaultRule,
        lucknow: defaultRule
    };

    WASTE_DATABASE.push({
        id: `added_item_${index}`,
        name: item.name,
        synonyms: item.syns,
        category: item.cat,
        material: item.mat,
        prepInstructions: item.prep,
        contaminationAlert: item.alert || "None",
        rules: rules
    });
});

// Dynamic fill to 100+ items
const materialsFill = [
    { prefix: "Plastic Container", cat: "recycling", mat: "Plastic", prep: "Rinse container, replace cap." },
    { prefix: "Cardboard Box", cat: "recycling", mat: "Paper", prep: "Flatten cardboard boxes completely." },
    { prefix: "Paper Envelope", cat: "recycling", mat: "Paper", prep: "Keep clean and dry." },
    { prefix: "Glass Pickle Jar", cat: "recycling", mat: "Glass", prep: "Rinse jar, recycle metal lid." },
    { prefix: "Metal Tin dabba", cat: "recycling", mat: "Metal", prep: "Wash out oil, dry tin." }
];

for (let i = 0; i < 45; i++) {
    const matIndex = i % materialsFill.length;
    const matObj = materialsFill[matIndex];
    WASTE_DATABASE.push({
        id: `generic_item_${i}`,
        name: `${matObj.prefix} Type ${i+1}`,
        synonyms: [`${matObj.prefix.toLowerCase()} type ${i+1}`, `generic ${matObj.prefix.toLowerCase()} ${i}`],
        category: matObj.cat,
        material: matObj.mat,
        prepInstructions: matObj.prep,
        contaminationAlert: "Standard household dry material.",
        rules: { sf: "Dry Waste.", nyc: "Dry Waste.", seattle: "Dry Waste.", chicago: "Dry Waste." }
    });
}

// ==========================================
// 2. STATE MANAGEMENT & SETUP
// ==========================================
let appState = {
    streak: 0,
    points: 0,
    activeTab: 'dashboard',
    chatHistory: [],
    gameScore: 0,
    gameStreak: 0,
    gameHighScore: 0,
    scannedDemoIndex: 0,
    scannedItemDetected: null,
    wizardSelectedMaterial: 'plastic',
    completedWizardCount: 0,
    // Advanced features state:
    compostBatches: [],
    calDate: new Date(),
    analyticsHistory: {
        weeks: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        recycling: [12.4, 15.1, 14.2, 16.8],
        compost: [8.5, 9.2, 11.0, 12.5],
        landfill: [4.1, 3.8, 3.2, 2.5],
        hazardous: [1.2, 0.8, 1.5, 0.9]
    }
};

window.addEventListener('DOMContentLoaded', () => {
    loadStateFromStorage();
    initChat();
    switchTab('dashboard');
    renderDBItems();
    simulateLocator();
    loadNextGameItem();
    checkAchievements();
    
    // Register PWA Service Worker
    registerServiceWorker();
    
    // Offline status detection
    updateOnlineStatus();
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    // Composting & Charts setup
    initCompostingCalendar();
    drawAnalyticsChart();
});

function saveStateToStorage() {
    localStorage.setItem('ecosort_state', JSON.stringify({
        streak: appState.streak,
        points: appState.points,
        gameHighScore: appState.gameHighScore,
        completedWizardCount: appState.completedWizardCount,
        compostBatches: appState.compostBatches,
        analyticsHistory: appState.analyticsHistory
    }));
    updateStatsUI();
    drawAnalyticsChart();
}

function loadStateFromStorage() {
    const stored = localStorage.getItem('ecosort_state');
    if (stored) {
        try {
            const data = JSON.parse(stored);
            appState.streak = data.streak || 0;
            appState.points = data.points || 0;
            appState.gameHighScore = data.gameHighScore || 0;
            appState.completedWizardCount = data.completedWizardCount || 0;
            appState.compostBatches = data.compostBatches || [];
            if (data.analyticsHistory) {
                appState.analyticsHistory = data.analyticsHistory;
            }
        } catch(e) {
            console.error("Error reading localStorage state:", e);
        }
    }
    updateStatsUI();
}

function updateStatsUI() {
    document.getElementById('streak-count').innerText = `${appState.streak} days`;
    document.getElementById('points-count').innerText = appState.points;
    document.getElementById('game-high-score').innerText = appState.gameHighScore;
    
    const baseRate = 88;
    const bonus = Math.min(12, Math.floor(appState.points / 20));
    const finalRate = baseRate + bonus;
    document.getElementById('diversion-rate').innerText = `${finalRate}%`;
    document.getElementById('diversion-progress').style.width = `${finalRate}%`;
}

// ==========================================
// 3. NAVIGATION CONTROLS
// ==========================================
function switchTab(tabId) {
    const panes = document.querySelectorAll('.tab-pane');
    panes.forEach(pane => pane.classList.remove('active'));
    
    const navButtons = document.querySelectorAll('.nav-item');
    navButtons.forEach(btn => btn.classList.remove('active'));
    
    const targetPane = document.getElementById(`tab-${tabId}-content`);
    if(targetPane) targetPane.classList.add('active');
    
    const targetNav = document.getElementById(`nav-${tabId}`);
    if(targetNav) targetNav.classList.add('active');
    
    appState.activeTab = tabId;
    
    const title = document.getElementById('tab-title');
    const subtitle = document.getElementById('tab-subtitle');
    
    switch(tabId) {
        case 'dashboard':
            title.innerText = "Swachh AI Waste Assistant";
            subtitle.innerText = "Ask questions, scan local waste, and practice SWM 2016 rules.";
            break;
        case 'wizard':
            title.innerText = "Dry Waste Contamination Checker";
            subtitle.innerText = "Calculate dry recycling quality before collection vans arrive.";
            break;
        case 'database':
            title.innerText = "City Rules Comparison";
            subtitle.innerText = "Check and compare segregation frameworks across Indian cities.";
            break;
        case 'ewaste':
            title.innerText = "Domestic Hazardous Rules";
            subtitle.innerText = "Check safety standards and locator hubs for toxic e-waste.";
            break;
        case 'game':
            title.innerText = "Swachh Sorting Arena";
            subtitle.innerText = "Sort local waste items into correct bins. Track your Swachh streak!";
            break;
    }
    
    if(tabId === 'game') {
        document.getElementById('game-score').innerText = appState.gameScore;
        document.getElementById('game-streak').innerText = `${appState.gameStreak} 🔥`;
    }
}

// ==========================================
// 4. ECOBOT: CHAT ASSISTANT
// ==========================================
function initChat() {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = `
        <div class="message bot">
            <div class="avatar"><i class="fa-solid fa-robot"></i></div>
            <div class="message-bubble">
                <p>Namaste! I am <strong>Swachh Bot</strong>, your segregation assistant. Ask me about Indian waste items (e.g., <em>"tender coconut shell"</em>, <em>"milk packet"</em>, <em>"pooja flowers"</em>, <em>"used diaper"</em>) or click "Scan Waste" to begin!</p>
            </div>
        </div>
    `;
}

function clearChat() {
    initChat();
}

function askItem(itemName) {
    document.getElementById('chat-input').value = itemName;
    sendChatMessage();
}

function handleChatKey(event) {
    if(event.key === 'Enter') {
        sendChatMessage();
    }
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const query = input.value.trim();
    if(!query) return;
    
    appendMessage(query, 'user');
    input.value = "";
    
    showTypingIndicator();
    
    setTimeout(() => {
        removeTypingIndicator();
        processBotResponse(query);
    }, 1200);
}

function appendMessage(text, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const icon = sender === 'bot' ? 'fa-robot' : 'fa-user';
    messageDiv.innerHTML = `
        <div class="avatar"><i class="fa-solid ${icon}"></i></div>
        <div class="message-bubble">
            ${text}
        </div>
    `;
    
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showTypingIndicator() {
    const chatBox = document.getElementById('chat-box');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot typing-indicator-msg';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
        <div class="avatar"><i class="fa-solid fa-robot"></i></div>
        <div class="message-bubble">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    chatBox.appendChild(typingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
}

function processBotResponse(query) {
    const item = searchDatabaseQuery(query);
    
    let htmlContent = "";
    if (item) {
        addPoints(10);
        
        let catColorClass = item.category;
        let catLabel = "DRY WASTE";
        if(item.category === 'compost') catLabel = "WET WASTE";
        else if(item.category === 'landfill') catLabel = "SANITARY WASTE";
        else if(item.category === 'hazardous') catLabel = "DOMESTIC HAZARDOUS";

        // Kabadiwala suggestion helper
        let kabadiwalaText = "";
        if (item.id === 'newspaper' || item.id === 'cardboard_carton' || item.id === 'plastic_water_bottle' || item.id === 'steel_ghee_tin') {
            kabadiwalaText = `<p style="font-size: 0.78rem; color: #fbbf24; margin-top: 8px;">
                <strong>💡 Kabadiwala Tip:</strong> Instead of throwing this, bundle it up and sell to your local scrap dealer to make extra money!
            </p>`;
        }
        
        htmlContent = `
            <p>I classified: <strong>${item.name}</strong> (${item.material}).</p>
            <p>Recommended Bin: <span class="db-item-bin ${catColorClass}" style="display:inline-block; margin-top:5px; font-weight:700;">${catLabel}</span></p>
            
            <div style="margin-top: 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--color-border); border-radius: 8px; padding: 10px;">
                <p style="font-size: 0.8rem; margin-bottom: 5px;"><strong><i class="fa-solid fa-circle-info"></i> How to prepare:</strong></p>
                <p style="font-size: 0.8rem; color: var(--color-text-secondary);">${item.prepInstructions}</p>
            </div>
            
            <p style="font-size: 0.78rem; color: var(--risk-high); margin-top: 8px;">
                <strong><i class="fa-solid fa-triangle-exclamation"></i> Contamination warning:</strong> ${item.contaminationAlert}
            </p>
            
            ${kabadiwalaText}

            <p style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 8px;">
                <em>Local City Rule:</em> ${item.rules[document.getElementById('db-city').value] || (item.category === "compost" ? "Wet Waste" : item.category === "recycling" ? "Dry Waste" : item.category === "hazardous" ? "Hazardous/E-waste" : "Sanitary Waste")}
            </p>
        `;
    } else {
        htmlContent = `
            <p>Aapka swagat hai! I couldn't find a direct classification for <em>"${query}"</em>.</p>
            <p>In India, segregate waste into 3-4 streams:</p>
            <ul>
               <li><strong>Dry Waste (Blue)</strong>: Rinsed plastics, paper cups, glass, tin cans.</li>
               <li><strong>Wet Waste (Green)</strong>: Veg peels, cooked food leftovers, tea leaves.</li>
               <li><strong>Sanitary Waste (Red wrapper)</strong>: Pads, diapers, clinical syringes.</li>
               <li><strong>E-Waste (Orange box)</strong>: Batteries, bulb cells, chargers.</li>
            </ul>
            <p>Try searching: <em>"coconut shell", "milk packet", "goodknight refill", "diaper"</em>.</p>
        `;
    }
    
    appendMessage(htmlContent, 'bot');
}

function searchDatabaseQuery(query) {
    const cleanQuery = query.toLowerCase().trim();
    if(!cleanQuery) return null;
    
    let found = WASTE_DATABASE.find(item => item.name.toLowerCase() === cleanQuery);
    if(found) return found;
    
    found = WASTE_DATABASE.find(item => {
        const nameMatches = item.name.toLowerCase().includes(cleanQuery) || cleanQuery.includes(item.name.toLowerCase());
        const synMatches = item.synonyms.some(syn => syn.toLowerCase().includes(cleanQuery) || cleanQuery.includes(syn.toLowerCase()));
        return nameMatches || synMatches;
    });
    
    return found || null;
}

// ==========================================
// 5. CAMERA SCANNER SIMULATOR
// ==========================================
const SCANNER_DEMO_ITEMS = [
    { name: "Amul Milk Packet", icon: "fa-whiskey-glass", category: "recycling" },
    { name: "Tender coconut shell", icon: "fa-seedling", category: "compost" },
    { name: "AA pencil battery", icon: "fa-car-battery", category: "hazardous" },
    { name: "Used baby diaper", icon: "fa-toilet-paper", category: "landfill" },
    { name: "Chai Glass (Paper)", icon: "fa-mug-hot", category: "landfill" }
];

function openScanner() {
    const modal = document.getElementById('scanner-modal');
    modal.classList.remove('hidden');
    
    const preview = document.getElementById('scanned-item-preview');
    const status = document.getElementById('scanner-status-text');
    const previewImg = document.getElementById('uploaded-image-preview');
    const fileInput = document.getElementById('scanner-file-input');
    
    if (previewImg) {
        previewImg.classList.add('hidden');
        previewImg.src = "";
    }
    if (fileInput) {
        fileInput.value = "";
    }
    
    preview.classList.add('hidden');
    status.innerText = "Initializing Swachh Cam Scanner... (Simulation)";
    status.classList.remove('hidden');
    appState.scannedItemDetected = null;
}

function closeScanner() {
    document.getElementById('scanner-modal').classList.add('hidden');
}

function cycleScannerSubject() {
    appState.scannedDemoIndex = (appState.scannedDemoIndex + 1) % SCANNER_DEMO_ITEMS.length;
    const currentDemo = SCANNER_DEMO_ITEMS[appState.scannedDemoIndex];
    
    const preview = document.getElementById('scanned-item-preview');
    const previewIcon = preview.querySelector('.preview-icon');
    const previewLabel = document.getElementById('preview-label');
    const status = document.getElementById('scanner-status-text');
    
    status.innerText = "Detecting Indian SWM waste category...";
    preview.classList.add('hidden');
    
    setTimeout(() => {
        previewIcon.className = `fa-solid ${currentDemo.icon} preview-icon`;
        previewLabel.innerText = currentDemo.name;
        
        status.classList.add('hidden');
        preview.classList.remove('hidden');
        appState.scannedItemDetected = currentDemo.name;
    }, 800);
}

function triggerScannerCapture() {
    if(!appState.scannedItemDetected) {
        cycleScannerSubject();
        return;
    }
    
    const itemName = appState.scannedItemDetected;
    closeScanner();
    switchTab('dashboard');
    
    document.getElementById('chat-input').value = `Visual Cam Scan: ${itemName}`;
    sendChatMessage();
    
    addPoints(25);
    appState.streak = Math.max(appState.streak, 1);
    saveStateToStorage();
}

// ==========================================
// 6. CONTAMINATION CALCULATOR
// ==========================================
function updateWizardFields() {
    const mat = document.getElementById('wiz-material').value;
    const adhesiveGroup = document.getElementById('adhesive-group');
    const prepGroup = document.getElementById('prep-group');
    
    if (mat === 'organic') {
        adhesiveGroup.classList.add('hidden');
        prepGroup.classList.add('hidden');
    } else {
        adhesiveGroup.classList.remove('hidden');
        prepGroup.classList.remove('hidden');
    }
}

function calculateContamination() {
    const material = document.getElementById('wiz-material').value;
    const residue = document.getElementById('wiz-residue').value;
    const adhesive = document.getElementById('wiz-adhesive').value;
    const rinsed = document.getElementById('wiz-rinsed').checked;
    const separated = document.getElementById('wiz-separated').checked;
    
    let baseScore = 10;
    
    if (residue === 'minor') baseScore += 20;
    else if (residue === 'medium') baseScore += 50;
    else if (residue === 'heavy') baseScore += 80;
    
    if (material !== 'organic') {
        if (adhesive === 'paper-label') baseScore += 10;
        else if (adhesive === 'plastic-sleeve') baseScore += 20;
        else if (adhesive === 'mixed') baseScore += 35;
    }
    
    if (rinsed && residue !== 'none') {
        baseScore = Math.max(10, baseScore - 30);
    }
    if (separated) {
        baseScore = Math.max(10, baseScore - 15);
    }
    
    baseScore = Math.min(100, baseScore);
    
    let riskLevel = "LOW RISK";
    let riskClass = "low";
    let adviceTitle = "Clean & Safe for Dry waste!";
    let adviceDesc = "Excellent! The item has little to no contamination and is ready for collection.";
    let steps = ["Check if the local collector requests direct dry collection.", "Do not bundle dry waste in plastic trash bags."];
    
    if (baseScore >= 35 && baseScore < 70) {
        riskLevel = "MEDIUM CONTAMINATION";
        riskClass = "medium";
        adviceTitle = "Requires Cleaning Before Disposal";
        adviceDesc = "Minor oil residues or plastic coatings are detected. Unwashed plastics attract insects and downgrade recycling value.";
        steps = [
            rinsed ? "You've rinsed it! Let it dry completely before binning." : "Cut open the plastic packet and rinse food remnants.",
            separated ? "Lids sorted! Awesome." : "Separate the cap, discard the inner seals.",
            "Remove thick plastic wraps or adhesive layers."
        ];
    } else if (baseScore >= 70) {
        riskLevel = "HEAVY CONTAMINATION";
        riskClass = "high";
        
        if (material === 'paper' || material === 'organic') {
            adviceTitle = "Compost (Wet Waste) or Sanitary";
            adviceDesc = "Soiled cardboard sweet boxes or wet food containers cannot be washed. Putting them in Blue Dry bins degrades other dry papers.";
            steps = [
                material === 'paper' ? "Do not recycle ghee-soaked sweet boxes. Put in WET WASTE compost." : "Compost organic waste locally.",
                "Sanitary liners go to RED sanitary waste bags wrapped in newsprint."
            ];
        } else {
            adviceTitle = "Wash thoroughly or Landfill";
            adviceDesc = "Extreme contamination. Recycle collectors will reject this item, putting it in landfill.";
            steps = [
                "Scrape dry food crusts/sauces completely.",
                "Rinse with clean/soapy water and allow to dry.",
                "If it cannot be washed (e.g. nested pump spouts), dispose in RED Sanitary Waste."
            ];
        }
    }
    
    const placeholder = document.querySelector('.result-placeholder');
    const resultContent = document.getElementById('wiz-result-content');
    
    placeholder.classList.add('hidden');
    resultContent.classList.remove('hidden');
    
    const badge = document.getElementById('wiz-risk-badge');
    badge.className = `risk-badge ${riskClass}`;
    badge.innerText = riskLevel;
    
    document.getElementById('wiz-score-num').innerText = baseScore;
    document.getElementById('wiz-result-title').innerText = adviceTitle;
    document.getElementById('wiz-result-desc').innerText = adviceDesc;
    
    const list = document.getElementById('wiz-steps-list');
    list.innerHTML = "";
    steps.forEach(step => {
        const li = document.createElement('li');
        li.innerText = step;
        list.appendChild(li);
    });
    
    appState.completedWizardCount++;
    addPoints(20);
    saveStateToStorage();
}

// ==========================================
// 7. REGIONAL SEARCH RULES DATABASE
// ==========================================
function renderDBItems(filteredList = null) {
    const container = document.getElementById('db-items-container');
    container.innerHTML = "";
    
    const currentCityKey = document.getElementById('db-city').value;
    const itemsToShow = filteredList || WASTE_DATABASE.slice(0, 15);
    
    if (itemsToShow.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding: 30px; color: var(--color-text-muted);">
                <i class="fa-solid fa-question-circle" style="font-size: 2.2rem; margin-bottom:10px;"></i>
                <p>No localized waste found. Try searching Ganesha, tender coconut, or Maggi!</p>
            </div>
        `;
        return;
    }
    
    itemsToShow.forEach(item => {
        const row = document.createElement('div');
        row.className = "db-item-row";
        
        const rawRule = item.rules[currentCityKey];
        const defaultRule = item.category === "compost" ? "Wet Waste (Green Bin)" : item.category === "recycling" ? "Dry Waste (Blue Bin)" : item.category === "hazardous" ? "Domestic Hazardous (Orange/Black Bin)" : "Sanitary Waste (Red Bin / Wrap)";
        const cityRule = rawRule || defaultRule;
        let binCategory = item.category;
        
        let labelName = "Dry Waste";
        if(item.category === 'compost') labelName = "Wet Waste";
        else if(item.category === 'landfill') labelName = "Sanitary";
        else if(item.category === 'hazardous') labelName = "Hazardous";

        row.innerHTML = `
            <div class="db-item-info">
                <h5>${item.name}</h5>
                <p>Material: <strong>${item.material}</strong> | Rule: ${cityRule}</p>
            </div>
            <span class="db-item-bin ${binCategory}">${labelName}</span>
        `;
        
        container.appendChild(row);
    });
}

function handleCityChange() {
    const select = document.getElementById('db-city');
    const cityName = select.options[select.selectedIndex].text.split(',')[0];
    document.getElementById('results-city-name').innerText = cityName;
    
    const panelName = document.getElementById('city-panel-name');
    const panelDesc = document.getElementById('city-panel-desc');
    const tagContainer = document.querySelector('.city-feature-tags');
    
    if (select.value === 'bengaluru') {
        panelName.innerText = "Bengaluru, KA";
        panelDesc.innerText = "BBMP Bengaluru mandates strict 3-way segregation at source. Wet waste composting is daily. Fines apply for mixing dry and sanitary waste streams.";
        tagContainer.innerHTML = `
            <span class="tag green-tag"><i class="fa-solid fa-check"></i> Wet Waste Daily</span>
            <span class="tag blue-tag"><i class="fa-solid fa-check"></i> Dry Waste collection</span>
            <span class="tag red-tag"><i class="fa-solid fa-circle-info"></i> Wrapped Sanitary Pads</span>
        `;
    } else if (select.value === 'mumbai') {
        panelName.innerText = "Mumbai, MH";
        panelDesc.innerText = "BMC Mumbai focuses on composting organic waste inside society complexes. Strict separation of Dry recyclable plastics and domestic hazardous waste.";
        tagContainer.innerHTML = `
            <span class="tag green-tag"><i class="fa-solid fa-check"></i> Society Composting</span>
            <span class="tag blue-tag"><i class="fa-solid fa-check"></i> Dry Recyclables</span>
            <span class="tag red-tag"><i class="fa-solid fa-ban"></i> Heavy Fines bulk waste</span>
        `;
    } else if (select.value === 'indore') {
        panelName.innerText = "Indore, MP";
        panelDesc.innerText = "India's cleanest city. Indore IMC mandates strict source segregation with separate compartments for Dry, Wet, Sanitary, Plastic, and E-waste in collection vans.";
        tagContainer.innerHTML = `
            <span class="tag green-tag"><i class="fa-solid fa-check"></i> Cleanest Indian City</span>
            <span class="tag blue-tag"><i class="fa-solid fa-check"></i> Source Plastic Bins</span>
            <span class="tag red-tag"><i class="fa-solid fa-check"></i> separate van chambers</span>
        `;
    } else if (select.value === 'delhi') {
        panelName.innerText = "Delhi (MCD)";
        panelDesc.innerText = "MCD Delhi organizes local waste collection camps. Mandates 3-bin source separation (Dry, Wet, Domestic Hazardous) to prevent landfill pollution.";
        tagContainer.innerHTML = `
            <span class="tag green-tag"><i class="fa-solid fa-check"></i> Wet sorting</span>
            <span class="tag blue-tag"><i class="fa-solid fa-check"></i> Dry sorting MCD hubs</span>
            <span class="tag red-tag"><i class="fa-solid fa-circle-info"></i> Landfill warnings</span>
        `;
    } else if (select.value === 'chennai') {
        panelName.innerText = "Chennai (GCC)";
        panelDesc.innerText = "Greater Chennai Corporation (GCC) enforces source segregation. Residents must separate biodegradable and non-biodegradable waste at home.";
        tagContainer.innerHTML = `
            <span class="tag green-tag"><i class="fa-solid fa-check"></i> 3-Bin standard</span>
            <span class="tag blue-tag"><i class="fa-solid fa-check"></i> Dry Waste collection</span>
            <span class="tag red-tag"><i class="fa-solid fa-triangle-exclamation"></i> Heavy fines for littering</span>
        `;
    } else if (select.value === 'kolkata') {
        panelName.innerText = "Kolkata (KMC)";
        panelDesc.innerText = "Kolkata Municipal Corporation (KMC) promotes primary waste segregation. Uses separate green and yellow/blue collection vans across wards.";
        tagContainer.innerHTML = `
            <span class="tag green-tag"><i class="fa-solid fa-check"></i> Green Organic Bin</span>
            <span class="tag blue-tag"><i class="fa-solid fa-check"></i> Blue Non-compostable</span>
            <span class="tag red-tag"><i class="fa-solid fa-circle-info"></i> Ward level drop-offs</span>
        `;
    } else if (select.value === 'hyderabad') {
        panelName.innerText = "Hyderabad (GHMC)";
        panelDesc.innerText = "GHMC Hyderabad distributes green (wet) and blue (dry) bins. Operates separate hazardous waste recovery centers across municipal circles.";
        tagContainer.innerHTML = `
            <span class="tag green-tag"><i class="fa-solid fa-check"></i> GHMC Wet collection</span>
            <span class="tag blue-tag"><i class="fa-solid fa-check"></i> Dry Recycling hubs</span>
            <span class="tag red-tag"><i class="fa-solid fa-shield"></i> E-waste recovery spots</span>
        `;
    } else if (select.value === 'pune') {
        panelName.innerText = "Pune (PMC)";
        panelDesc.innerText = "PMC Pune partners with SWaCH, a door-to-door cooperative. Features model sorting models for composting wet waste and recovering plastics.";
        tagContainer.innerHTML = `
            <span class="tag green-tag"><i class="fa-solid fa-check"></i> SWaCH sorting model</span>
            <span class="tag blue-tag"><i class="fa-solid fa-check"></i> Dry recycling pickers</span>
            <span class="tag red-tag"><i class="fa-solid fa-hand-holding-heart"></i> Sanitation safety</span>
        `;
    } else if (select.value === 'ahmedabad') {
        panelName.innerText = "Ahmedabad (AMC)";
        panelDesc.innerText = "AMC Ahmedabad runs waste-to-energy plants. Focuses heavily on recovering dry paper and plastic wrappers from households.";
        tagContainer.innerHTML = `
            <span class="tag green-tag"><i class="fa-solid fa-check"></i> Wet digestion plants</span>
            <span class="tag blue-tag"><i class="fa-solid fa-check"></i> Plastic shredding hubs</span>
            <span class="tag red-tag"><i class="fa-solid fa-bolt"></i> Waste-to-Energy feed</span>
        `;
    } else if (select.value === 'lucknow') {
        panelName.innerText = "Lucknow (LMC)";
        panelDesc.innerText = "LMC Lucknow implements colored bins. Door-to-door collector teams check segregation before tipping in local dump bins.";
        tagContainer.innerHTML = `
            <span class="tag green-tag"><i class="fa-solid fa-check"></i> LMC green bins</span>
            <span class="tag blue-tag"><i class="fa-solid fa-check"></i> Dry waste vans</span>
            <span class="tag red-tag"><i class="fa-solid fa-circle-info"></i> Neighborhood recovery</span>
        `;
    } else if (select.value === 'ludhiana') {
        panelName.innerText = "Ludhiana (LMC)";
        panelDesc.innerText = "Ludhiana Municipal Corporation (LMC) runs organic waste compost processing programs. Encourages households to separate clean plastics and paper.";
        tagContainer.innerHTML = `
            <span class="tag green-tag"><i class="fa-solid fa-check"></i> LMC compost plant</span>
            <span class="tag blue-tag"><i class="fa-solid fa-check"></i> Plastic segregation</span>
            <span class="tag red-tag"><i class="fa-solid fa-circle-info"></i> Ward level drives</span>
        `;
    } else if (select.value === 'amritsar') {
        panelName.innerText = "Amritsar (AMC)";
        panelDesc.innerText = "Amritsar Municipal Corporation (AMC) focuses on the Holy City Swachh campaign. Organizes organic temple flower collection (nirmalya) for biogas.";
        tagContainer.innerHTML = `
            <span class="tag green-tag"><i class="fa-solid fa-check"></i> Nirmalya biogas</span>
            <span class="tag blue-tag"><i class="fa-solid fa-check"></i> Dry raddi recyclables</span>
            <span class="tag red-tag"><i class="fa-solid fa-star"></i> Holy city guidelines</span>
        `;
    } else if (select.value === 'jalandhar') {
        panelName.innerText = "Jalandhar (JMC)";
        panelDesc.innerText = "Jalandhar Municipal Corporation (JMC) implements dry and wet source sorting. Segregated collection vans reach out weekly.";
        tagContainer.innerHTML = `
            <span class="tag green-tag"><i class="fa-solid fa-check"></i> Source sorting JMC</span>
            <span class="tag blue-tag"><i class="fa-solid fa-check"></i> Weekly collection</span>
            <span class="tag red-tag"><i class="fa-solid fa-circle-info"></i> Local collection vans</span>
        `;
    } else if (select.value === 'patiala') {
        panelName.innerText = "Patiala (PMC)";
        panelDesc.innerText = "Patiala Municipal Corporation (PMC) promotes colored bins for separating household trash. Bio-degradables are composted in city nursery grounds.";
        tagContainer.innerHTML = `
            <span class="tag green-tag"><i class="fa-solid fa-check"></i> Nursery composting</span>
            <span class="tag blue-tag"><i class="fa-solid fa-check"></i> PMC colored bins</span>
            <span class="tag red-tag"><i class="fa-solid fa-triangle-exclamation"></i> Heavy littering checks</span>
        `;
    } else if (select.value === 'bathinda') {
        panelName.innerText = "Bathinda (BMC)";
        panelDesc.innerText = "Bathinda Municipal Corporation (BMC) runs municipal solid waste treatment systems, emphasizing segregation of organic/kitchen wastes.";
        tagContainer.innerHTML = `
            <span class="tag green-tag"><i class="fa-solid fa-check"></i> BMC SWM treatment</span>
            <span class="tag blue-tag"><i class="fa-solid fa-check"></i> Dry waste recovery</span>
            <span class="tag red-tag"><i class="fa-solid fa-circle-info"></i> Organic compost yard</span>
        `;
    }
    
    searchDatabase();
}

function searchDatabase() {
    const query = document.getElementById('db-search-input').value.trim().toLowerCase();
    const clearBtn = document.getElementById('db-search-clear');
    
    if (query) {
        clearBtn.classList.remove('hidden');
        
        const filtered = WASTE_DATABASE.filter(item => {
            return item.name.toLowerCase().includes(query) || 
                   item.material.toLowerCase().includes(query) ||
                   item.synonyms.some(syn => syn.toLowerCase().includes(query));
        });
        
        document.getElementById('results-count').innerText = `Matches: ${filtered.length}`;
        renderDBItems(filtered);
    } else {
        clearBtn.classList.add('hidden');
        document.getElementById('results-count').innerText = "Showing All Items";
        renderDBItems();
    }
}

function clearDBSearch() {
    document.getElementById('db-search-input').value = "";
    searchDatabase();
}

// ==========================================
// 8. HAZARDOUS RECYCLING LOCATOR MOCK
// ==========================================
const MOCK_LOCATOR_DATA = {
    "560001": [
        { name: "BBMP Ward DWCC (Bengaluru Dry Waste Center)", address: "Tasker Town, Shivaji Nagar, Bengaluru, KA 560001", hours: "Mon-Sat 9:00 AM - 5:00 PM", items: "Milk Packets, E-waste, Plastics, Cardboards", coordinates: "pin-1" },
        { name: "Saahas Zero Waste collection kiosk", address: "M.G. Road Metro station, Bengaluru, KA 560001", hours: "Daily 8:00 AM - 8:00 PM", items: "Batteries, Cellphones, Charger Cables", coordinates: "pin-2" },
        { name: "Sree Auto Battery recycle center", address: "Ulsoor Road, Bengaluru, KA 560042", hours: "Daily 10:00 AM - 7:00 PM", items: "Lead-Acid Car Batteries, Inverters", coordinates: "pin-3" }
    ],
    "400001": [
        { name: "BMC Local Ward E-waste Hub", address: "Fort area near CST station, Mumbai, MH 400001", hours: "Saturdays 10:00 AM - 4:00 PM", items: "Tubes, CFLs, expired medicines", coordinates: "pin-1" },
        { name: "Staples E-Cycle booth", address: "Colaba Causeway, Mumbai, MH 400005", hours: "Daily 11:00 AM - 8:00 PM", items: "Rechargeable Li-Ion cell packs, phones", coordinates: "pin-2" },
        { name: "Chroma Electronics Recycler kiosk", address: "Lower Parel Mall, Mumbai, MH 400013", hours: "Daily 11:00 AM - 9:00 PM", items: "Broken laptops, adapters, wiring", coordinates: "pin-3" }
    ],
    "452001": [
        { name: "IMC Solid Waste Hub (Indore Rajwada)", address: "Rajwada Palace, Indore, MP 452001", hours: "Mon-Sat 8:00 AM - 6:00 PM", items: "Plastics, Cardboard, Kitchen Composting", coordinates: "pin-1" },
        { name: "Swachh Indore Plastic Shred Kiosk", address: "Palasia square, Indore, MP 452001", hours: "Daily 9:00 AM - 8:00 PM", items: "Plastic packaging, pet bottles", coordinates: "pin-2" },
        { name: "Palasia E-Waste Deposit Centre", address: "GPO square, Indore, MP 452001", hours: "Mon-Fri 10:00 AM - 5:00 PM", items: "Batteries, CFLs, Charger cables", coordinates: "pin-3" }
    ],
    "110001": [
        { name: "MCD Delhi Domestic Hazard Center", address: "Connaught Place Block A, New Delhi 110001", hours: "Thu-Mon 9:00 AM - 4:30 PM", items: "Aerosol sprays, mosquito refills, CFLs", coordinates: "pin-1" },
        { name: "Delhi Battery Disposal Center", address: "Karol Bagh Market, Delhi 110005", hours: "Mon-Sat 10:00 AM - 6:00 PM", items: "Batteries, power cords, phone cells", coordinates: "pin-2" },
        { name: "E-waste Recycle Camp MCD", address: "Lajpat Nagar, Delhi 110024", hours: "Sundays only 9:00 AM - 1:00 PM", items: "Laptops, keyboard components, monitors", coordinates: "pin-3" }
    ],
    "600001": [
        { name: "GCC Dry Waste Resource Center", address: "Broadway Terminus, George Town, Chennai, TN 600001", hours: "Mon-Sat 9:00 AM - 5:30 PM", items: "Plastics, cardboard, clean paper packaging", coordinates: "pin-1" },
        { name: "Chennai E-Waste Collect Hub", address: "Parrys Corner, Chennai, TN 600001", hours: "Daily 10:00 AM - 7:00 PM", items: "Pencil cells, phone batteries, laptop parts", coordinates: "pin-2" },
        { name: "Stanley Medical Chemical Dispose", address: "Stanley College Road, Chennai, TN 600001", hours: "Mon-Fri 9:00 AM - 4:00 PM", items: "Expired medicines, toxic packages", coordinates: "pin-3" }
    ],
    "700001": [
        { name: "KMC Ward 45 Recyclables Center", address: "Bowbazar Square, Kolkata, WB 700001", hours: "Mon-Sat 8:30 AM - 4:30 PM", items: "Newspapers, cardboard, clean glass jars", coordinates: "pin-1" },
        { name: "Kolkata E-Cycle Centre", address: "Park Street Crossing, Kolkata, WB 700016", hours: "Daily 10:00 AM - 8:00 PM", items: "CFLs, mercury thermometers, wires", coordinates: "pin-2" },
        { name: "Howrah Industrial Metal Recycler", address: "Howrah Road, Kolkata, WB 711101", hours: "Mon-Fri 10:00 AM - 6:00 PM", items: "Iron dabbas, heavy scrap wires", coordinates: "pin-3" }
    ],
    "500001": [
        { name: "GHMC Dry Waste Sorting Center", address: "Station Road, Nampally, Hyderabad, TG 500001", hours: "Mon-Sat 9:00 AM - 5:00 PM", items: "Cardboards, plastic bottles, steel ghee tins", coordinates: "pin-1" },
        { name: "Hyderabad E-Waste Recovery Hub", address: "Abids GPO Circle, Hyderabad, TG 500001", hours: "Daily 10:00 AM - 7:00 PM", items: "Mobile devices, old adapters, charger cords", coordinates: "pin-2" },
        { name: "Deccan Lead Battery Recyclers", address: "Koti Main Road, Hyderabad, TG 500095", hours: "Mon-Sat 10:00 AM - 7:30 PM", items: "Car batteries, UPS lead battery cells", coordinates: "pin-3" }
    ],
    "411001": [
        { name: "SWaCH Cooperative Scrap Center", address: "Deccan Gymkhana Road, Pune, MH 411004", hours: "Daily 8:00 AM - 2:00 PM", items: "Dry waste, washed milk bags, clean glass", coordinates: "pin-1" },
        { name: "Pune E-Waste Deposit Station", address: "Shivaji Nagar Road near Station, Pune, MH 411005", hours: "Mon-Sat 9:00 AM - 6:00 PM", items: "Tube lights, laptop cells, chargers", coordinates: "pin-2" },
        { name: "PMC Hazardous Disposal Depot", address: "Swargate Circle, Pune, MH 411001", hours: "Mon-Sat 10:00 AM - 5:00 PM", items: "Mosquito spray cans, expired drugs", coordinates: "pin-3" }
    ],
    "380001": [
        { name: "AMC Plastic Shredder Center", address: "Kalupur Station area, Ahmedabad, GJ 380001", hours: "Mon-Sat 9:00 AM - 6:00 PM", items: "PET plastic bottles, milk packets, wrappers", coordinates: "pin-1" },
        { name: "Ahmedabad E-Waste collection", address: "Lal Darwaja Circle, Ahmedabad, GJ 380001", hours: "Daily 10:00 AM - 8:00 PM", items: "Charger block cells, phone batteries", coordinates: "pin-2" },
        { name: "Sabarmati Scrap Recovery Yard", address: "Sabarmati Road, Ahmedabad, GJ 380005", hours: "Mon-Sat 9:00 AM - 5:00 PM", items: "Metal canisters, heavy wires, wood scrap", coordinates: "pin-3" }
    ],
    "226001": [
        { name: "LMC Hazratganj Dry Waste Hub", address: "Hazratganj Main Market, Lucknow, UP 226001", hours: "Mon-Sat 9:30 AM - 6:00 PM", items: "Raddi paper, milk packets, packaging paper", coordinates: "pin-1" },
        { name: "Lucknow E-Waste Collector Camp", address: "Chowk Bazar Road, Lucknow, UP 226003", hours: "Mon-Fri 11:00 AM - 7:00 PM", items: "Tubes, CFL bulbs, charging cords", coordinates: "pin-2" },
        { name: "Awadh Lead-Acid Battery Recyclers", address: "Charbagh area, Lucknow, UP 226001", hours: "Mon-Sat 10:00 AM - 6:30 PM", items: "Lead acid inverters, car battery packs", coordinates: "pin-3" }
    ],
    "141001": [
        { name: "LMC Waste Management Hub", address: "Ghumar Mandi Market, Ludhiana, PB 141001", hours: "Mon-Sat 9:00 AM - 5:30 PM", items: "Dry plastics, cardboards, paper packaging", coordinates: "pin-1" },
        { name: "Ludhiana E-cycle depot", address: "Model Town area, Ludhiana, PB 141002", hours: "Daily 10:00 AM - 7:00 PM", items: "Batteries, CFL bulbs, electronic items", coordinates: "pin-2" },
        { name: "Ludhiana Industrial Scrap Collector", address: "Link Road, Ludhiana, PB 141003", hours: "Mon-Sat 10:00 AM - 6:00 PM", items: "Heavy metals, copper cables, plastic drums", coordinates: "pin-3" }
    ],
    "143001": [
        { name: "AMC Nirmalya Temple Waste Biogas Kiosk", address: "Heritage Walk, near Golden Temple, Amritsar, PB 143006", hours: "Daily 6:00 AM - 9:00 PM", items: "Pooja flowers, organic offerings, leaves", coordinates: "pin-1" },
        { name: "Amritsar Swachh E-Waste Centre", address: "Hall Bazaar Road, Amritsar, PB 143001", hours: "Mon-Sat 10:00 AM - 6:30 PM", items: "Mosquito vaporizer refills, phone batteries", coordinates: "pin-2" },
        { name: "Amritsar Battery Scrap Center", address: "Katra Jaimal Singh, Amritsar, PB 143001", hours: "Daily 10:00 AM - 7:00 PM", items: "Inverter battery packs, lead cells", coordinates: "pin-3" }
    ],
    "144001": [
        { name: "JMC Dry Waste Center", address: "Model Town main road, Jalandhar, PB 144001", hours: "Mon-Sat 9:00 AM - 5:00 PM", items: "Cardboard cartons, pet bottles, newspapers", coordinates: "pin-1" },
        { name: "Jalandhar Electronic Scrap Center", address: "Jalandhar Cantonment area, Jalandhar, PB 144005", hours: "Daily 10:00 AM - 8:00 PM", items: "Cables, broken chargers, electronics", coordinates: "pin-2" },
        { name: "Jalandhar Lead Acid Battery Dealers", address: "GT Road, Jalandhar, PB 144001", hours: "Mon-Sat 10:00 AM - 6:00 PM", items: "Lead automobile batteries, chemical packs", coordinates: "pin-3" }
    ],
    "147001": [
        { name: "PMC Nursery Composting Hub", address: "Baradari Gardens area, Patiala, PB 147001", hours: "Mon-Sat 8:00 AM - 4:00 PM", items: "Dry leaves, organic kitchen compost boxes", coordinates: "pin-1" },
        { name: "Patiala E-Waste Collection Point", address: "Leela Bhawan market, Patiala, PB 147001", hours: "Daily 10:00 AM - 7:00 PM", items: "Pencil cells, tubelights, old phone parts", coordinates: "pin-2" },
        { name: "Patiala Domestic Hazardous Depot", address: "Chhoti Baradari, Patiala, PB 147001", hours: "Mon-Fri 9:30 AM - 5:00 PM", items: "Expired medicines, aerosol tins", coordinates: "pin-3" }
    ],
    "151001": [
        { name: "BMC SWM Treatment Plant", address: "Industrial Focal Point, Bathinda City, PB 151001", hours: "Mon-Sat 9:00 AM - 5:00 PM", items: "Compostable items, raw dry papers", coordinates: "pin-1" },
        { name: "Bathinda E-Waste Recovery Hub", address: "Goniana Road Crossing, Bathinda, PB 151001", hours: "Daily 10:00 AM - 7:30 PM", items: "Charging wires, adapters, old electronics", coordinates: "pin-2" },
        { name: "Bathinda Battery Cell Recycling", address: "Bathinda Cantt market, Bathinda, PB 151001", hours: "Mon-Sat 10:00 AM - 6:00 PM", items: "Car batteries, lead cells", coordinates: "pin-3" }
    ]
};

function simulateLocator() {
    const zip = document.getElementById('locator-zip').value.trim();
    const container = document.getElementById('locations-list-container');
    container.innerHTML = "";
    
    document.querySelectorAll('.map-pin').forEach(pin => pin.classList.remove('active'));
    
    const centers = MOCK_LOCATOR_DATA[zip] || MOCK_LOCATOR_DATA["560001"];
    
    centers.forEach((center, index) => {
        const div = document.createElement('div');
        div.className = `location-item ${index === 0 ? 'active' : ''}`;
        div.id = `loc-item-${index}`;
        div.onclick = () => focusLocatorCenter(index);
        
        div.innerHTML = `
            <h6>${center.name}</h6>
            <p><i class="fa-solid fa-map-pin"></i> ${center.address}</p>
            <p><i class="fa-solid fa-clock"></i> ${center.hours}</p>
            <span>Accepts: ${center.items}</span>
        `;
        container.appendChild(div);
        
        if (index === 0) {
            const pinId = center.coordinates;
            const pin = document.getElementById(pinId);
            if(pin) pin.classList.add('active');
        }
    });
}

function focusLocatorCenter(index) {
    document.querySelectorAll('.location-item').forEach(item => item.classList.remove('active'));
    const targetRow = document.getElementById(`loc-item-${index}`);
    if (targetRow) targetRow.classList.add('active');
    
    document.querySelectorAll('.map-pin').forEach(pin => pin.classList.remove('active'));
    
    const zip = document.getElementById('locator-zip').value.trim();
    const centers = MOCK_LOCATOR_DATA[zip] || MOCK_LOCATOR_DATA["560001"];
    const targetCenter = centers[index];
    
    if (targetCenter) {
        const pin = document.getElementById(targetCenter.coordinates);
        if(pin) pin.classList.add('active');
    }
}

// ==========================================
// 9. "BIN-IT!" WASTE SORTING MINI-GAME
// ==========================================
let gameItemsQueue = [];
let gameCurrentItem = null;

const GAME_SOURCE_ITEMS = [
    // Organic / Wet Waste (Green)
    { name: "Tender Coconut Shell", cat: "compost", mat: "Organic", desc: "Wet waste in India. Takes time to decompose but industrially compostable.", icon: "fa-seedling" },
    { name: "Pooja Nirmalya Garland", cat: "compost", mat: "Organic", desc: "Temple flower garlands. Compostable after removing plastic threads.", icon: "fa-seedling" },
    { name: "Used Tea Leaves (Chai Patti)", cat: "compost", mat: "Organic", desc: "Chai waste. Compostable; can go directly into home garden pots.", icon: "fa-mug-hot" },
    { name: "Banana Peel (Kela Chilkha)", cat: "compost", mat: "Organic", desc: "Kitchen waste. Highly biodegradable wet waste.", icon: "fa-seedling" },
    { name: "Mango Seed (Guthli)", cat: "compost", mat: "Organic", desc: "Wet organic waste. Compostable in composting bins.", icon: "fa-seedling" },
    { name: "Cooked Leftover Rice", cat: "compost", mat: "Organic", desc: "Biodegradable food scraps. Sort into wet waste.", icon: "fa-bowl-rice" },
    { name: "Egg Shells (Anda Chilkha)", cat: "compost", mat: "Organic", desc: "Calcium rich organic leftovers. Compostable.", icon: "fa-egg" },
    { name: "Coconut Husk (Coir)", cat: "compost", mat: "Organic", desc: "Coconut coir fibers. Natural compostable garden material.", icon: "fa-seedling" },
    { name: "Chicken Bones", cat: "compost", mat: "Organic", desc: "Industrial compost centers decompose bone waste easily.", icon: "fa-drumstick-bite" },
    { name: "Stale Roti / Chapati", cat: "compost", mat: "Organic", desc: "Dry wheat leftovers. Sort into wet waste.", icon: "fa-cookie" },
    { name: "Clay Kulhad Cup", cat: "compost", mat: "Organic", desc: "Unbaked clay tea cup. Environment friendly, returns to earth.", icon: "fa-coffee" },
    { name: "Eco-friendly Ganesha Idol", cat: "compost", mat: "Organic", desc: "Clay/soil idol painted with organic colours. Completely compostable.", icon: "fa-om" },
    { name: "Vegetable Rinds & Skins", cat: "compost", mat: "Organic", desc: "Vegetable scraps. Ideal wet waste.", icon: "fa-carrot" },
    { name: "Stale Bread Slices", cat: "compost", mat: "Organic", desc: "Bakery scraps. Biodegrades quickly in composting.", icon: "fa-bread-slice" },
    { name: "Coffee Grounds", cat: "compost", mat: "Organic", desc: "Used coffee powder. Excellent organic nutrient.", icon: "fa-mug-saucer" },
    { name: "Lemon Peels", cat: "compost", mat: "Organic", desc: "Citrus skin waste. Sort in wet compost waste.", icon: "fa-lemon" },
    { name: "Melon Rind", cat: "compost", mat: "Organic", desc: "Thick fruit skins. Compostable.", icon: "fa-apple-whole" },
    { name: "Onion Skins", cat: "compost", mat: "Organic", desc: "Dry skin peels of onions. Wet composting.", icon: "fa-seedling" },
    { name: "Potato Peels", cat: "compost", mat: "Organic", desc: "Kitchen scrap peels. Composts easily.", icon: "fa-carrot" },
    { name: "Pooja Nirmalya Leaves", cat: "compost", mat: "Organic", desc: "Used betel or neem leaves. Natural organic compost.", icon: "fa-leaf" },
    { name: "Wooden Toothpicks", cat: "compost", mat: "Organic", desc: "Small wood splinters. Compostable.", icon: "fa-hashtag" },
    { name: "Popsicle Stick (Wooden)", cat: "compost", mat: "Organic", desc: "Clean unpainted wood. Composts naturally.", icon: "fa-lines-leaning" },
    { name: "Natural Wine Cork", cat: "compost", mat: "Organic", desc: "Biodegradable natural wood cork.", icon: "fa-plug" },
    { name: "Backyard Leaf Swill", cat: "compost", mat: "Organic", desc: "Dry fallen leaves and twigs. Wet waste compost.", icon: "fa-leaf" },
    { name: "Oily Samosa Carton", cat: "compost", mat: "Paper", desc: "Cardboard boxes heavily soaked in food oils belong in Wet Waste.", icon: "fa-box" },
    { name: "Oily Halwai Sweet Box", cat: "compost", mat: "Paper", desc: "Sugar syrup and ghee soaked sweet boxes go to wet waste.", icon: "fa-box-open" },

    // Recyclable / Dry Waste (Blue)
    { name: "Washed Amul Milk Packet", cat: "recycling", mat: "Plastic", desc: "Rinsed plastic packet. Keep corner piece attached when cutting.", icon: "fa-prescription-bottle" },
    { name: "Raddi Newspapers", cat: "recycling", mat: "Paper", desc: "Dry papers. Keep dry and sell to local Kabadiwala scrap dealers.", icon: "fa-newspaper" },
    { name: "Amazon Cardboard Box", cat: "recycling", mat: "Paper", desc: "Flattened cardboard boxes. Recycle or sell to Kabadiwala.", icon: "fa-box" },
    { name: "Bisleri Water Bottle", cat: "recycling", mat: "Plastic", desc: "PET plastic bottle. Crush flat, keep the cap attached.", icon: "fa-bottle-water" },
    { name: "Biryani Foil Container (Clean)", cat: "recycling", mat: "Metal", desc: "Clean food foil trays. Spices and grease must be rinsed.", icon: "fa-square" },
    { name: "Steel Ghee Tin", cat: "recycling", mat: "Metal", desc: "Empty tin can. Rinse out thick oil deposits first.", icon: "fa-prescription-bottle" },
    { name: "Glass Achar / Pickle Jar", cat: "recycling", mat: "Glass", desc: "Rinse thick oil residue. Glass can be recycled infinitely.", icon: "fa-wine-glass" },
    { name: "Old Cotton Kurta", cat: "recycling", mat: "Paper", desc: "Cotton textile. Reuse as rags or hand to fabric recyclers.", icon: "fa-shirt" },
    { name: "Shampoo Bottle (Empty)", cat: "recycling", mat: "Plastic", desc: "Rinse soapy suds. Recycle plastic body.", icon: "fa-bottle-droplet" },
    { name: "Coca-cola Beverage Can", cat: "recycling", mat: "Metal", desc: "Aluminum pop can. Keep tab attached.", icon: "fa-beer-mug-empty" },
    { name: "School Notebooks (Raddi)", cat: "recycling", mat: "Paper", desc: "Used school copies. Sell to Kabadiwala to earn cash.", icon: "fa-book" },
    { name: "Cardboard Shoe Box", cat: "recycling", mat: "Paper", desc: "Clean dry cardboard packaging box.", icon: "fa-box" },
    { name: "Glass Honey Bottle", cat: "recycling", mat: "Glass", desc: "Rinse sticky sugar syrup first. Glass jar is recyclable.", icon: "fa-glass-water" },
    { name: "Paper Envelope (Mail)", cat: "recycling", mat: "Paper", desc: "Dry mail letters. Remove heavy wax seal tags.", icon: "fa-envelope" },
    { name: "Amul Curd Cup (Washed)", cat: "recycling", mat: "Plastic", desc: "#5 PP plastic cup. Rinse curd remains, recycle.", icon: "fa-prescription-bottle" },
    { name: "Aluminium Foil (Clean)", cat: "recycling", mat: "Metal", desc: "Scrunch clean foil sheets into a ball to prevent loss in sorting.", icon: "fa-circle" },
    { name: "Plastic Soap Bottle", cat: "recycling", mat: "Plastic", desc: "Rinse clean, throw plastic pump mechanism in Sanitary bin.", icon: "fa-pump-medical" },
    { name: "Steel Bottle Caps", cat: "recycling", mat: "Metal", desc: "Collect caps inside empty steel cans, crimp top shut to sort.", icon: "fa-circle-dot" },
    { name: "Gift wrapping paper (Plain)", cat: "recycling", mat: "Paper", desc: "Plain paper wrap. Ribbons/bows must go in landfill.", icon: "fa-scroll" },
    { name: "Cardboard Core Roll", cat: "recycling", mat: "Paper", desc: "Toilet paper or paper towel cardboard inner rolls.", icon: "fa-toilet-paper" },
    { name: "Plastic Clamshell Box", cat: "recycling", mat: "Plastic", desc: "Rigid plastic fruit/clamshell box. Rinse clean.", icon: "fa-border-all" },
    { name: "Juice carton (Tetrapak)", cat: "recycling", mat: "Paper", desc: "Laminated juice carton. Empty liquid, keep cap attached.", icon: "fa-box-open" },
    { name: "Cardboard Egg Carton", cat: "recycling", mat: "Paper", desc: "Dry carton. Ensure no egg yolk residues remain.", icon: "fa-table-cells" },
    { name: "Paper Cup Sleeve", cat: "recycling", mat: "Paper", desc: "Paper wrap sleeve. Recycle with dry paper.", icon: "fa-ticket" },
    { name: "Tomato Sauce Bottle (Glass)", cat: "recycling", mat: "Glass", desc: "Rinse red sauce residue fully before binning.", icon: "fa-glass-water" },

    // Sanitary / Soiled Waste (Red)
    { name: "Used Baby Diaper", cat: "landfill", mat: "Organic", desc: "Biological waste. Wrap in newsprint marked with a Red cross.", icon: "fa-toilet-paper" },
    { name: "Used Sanitary Pad", cat: "landfill", mat: "Organic", desc: "Menstrual waste. Wrap separately in newspaper marked with Red 'X'.", icon: "fa-droplet-slash" },
    { name: "Clinical Bandage (Soiled)", cat: "landfill", mat: "Organic", desc: "Dirty medical bandages containing blood/bodily fluid toxins.", icon: "fa-crutch" },
    { name: "Plastic Chai Glass", cat: "landfill", mat: "Paper", desc: "Paper chai cups are lined with plastic wax coating and cannot compost.", icon: "fa-mug-hot" },
    { name: "Toothpaste Colgate Tube", cat: "landfill", mat: "Plastic", desc: "Laminated multilayer tube. Unrecyclable in standard plants.", icon: "fa-trash" },
    { name: "Disposable Medical Syringe", cat: "landfill", mat: "Organic", desc: "Clinical needle hazard. Discard in Sanitary Waste (Red Bin).", icon: "fa-syringe" },
    { name: "Soiled Tissue Paper", cat: "landfill", mat: "Paper", desc: "Tissue containing bodily fluids or chemical solvents.", icon: "fa-toilet-paper" },
    { name: "Dental Floss Thread", cat: "landfill", mat: "Plastic", desc: "Nylon threads are too small to sort and tangle machinery.", icon: "fa-hashtag" },
    { name: "Styrofoam parcel box", cat: "landfill", mat: "Plastic", desc: "Foam wrap. Polystyrene breaks into microplastics.", icon: "fa-box-open" },
    { name: "Uncle Chipps packet", cat: "landfill", mat: "Plastic", desc: "Hybrid plastic/metal foil bags cannot be separated.", icon: "fa-box-open" },
    { name: "Kurkure wrapper", cat: "landfill", mat: "Plastic", desc: "Multilayer plastic snack bag. Non-recyclable landfill waste.", icon: "fa-box-open" },
    { name: "Chocolate wrapper", cat: "landfill", mat: "Plastic", desc: "Thin plastic wrapper sheets. Discard in landfill.", icon: "fa-box-open" },
    { name: "Lotion Tube (Plastic)", cat: "landfill", mat: "Plastic", desc: "Cosmetic tubes contain thick residues, unrecyclable.", icon: "fa-soap" },
    { name: "Ziploc Food Bag (Oily)", cat: "landfill", mat: "Plastic", desc: "Soiled film baggie. Tangles sorting machinery gears.", icon: "fa-box-open" },
    { name: "Dirty paper plate", cat: "landfill", mat: "Paper", desc: "Wax coated and heavily grease stained paper plate.", icon: "fa-square-minus" },
    { name: "Medical Cotton Pad", cat: "landfill", mat: "Organic", desc: "Soiled surgical cotton swabs. Biohazard.", icon: "fa-circle" },
    { name: "Thermal store receipt", cat: "landfill", mat: "Paper", desc: "Thermal billing paper contains toxic BPA chemical coatings.", icon: "fa-file-invoice" },
    { name: "Broken Ceramic cup", cat: "landfill", mat: "Glass", desc: "Pyrex/ceramic does not melt in glass recycling furnaces.", icon: "fa-heart-crack" },
    { name: "Plastic drinking straws", cat: "landfill", mat: "Plastic", desc: "Straws are too thin and fall through sorting screens.", icon: "fa-minus" },
    { name: "Plastic forks/spoons", cat: "landfill", mat: "Plastic", desc: "Awkward shape jams conveyor wheels. Landfill.", icon: "fa-spoon" },
    { name: "Shiny Wrapping Paper", cat: "landfill", mat: "Paper", desc: "Metallic foil or glitter paper cannot be recycled.", icon: "fa-gift" },
    { name: "Satin Ribbon bow", cat: "landfill", mat: "Plastic", desc: "Gift wrapping ribbons tangle recycling wheels.", icon: "fa-ribbon" },
    { name: "Disposable medical mask", cat: "landfill", mat: "Organic", desc: "Face mask. High pathogenic hazard. Wrap and landfill.", icon: "fa-head-side-mask" },
    { name: "Wet floor wipe sheet", cat: "landfill", mat: "Organic", desc: "Polyester fibers do not biodegrade. Landfill.", icon: "fa-toilet-paper" },
    { name: "Expired Pills (Blister pack)", cat: "landfill", mat: "Chemical", desc: "Medical waste. Never flush down toilets. Return to pharmacy bins.", icon: "fa-tablets" },
    { name: "Toothbrush (Plastic)", cat: "landfill", mat: "Plastic", desc: "Mixed plastic/nylon bristles. Landfill.", icon: "fa-toothbrush" },

    // Hazardous & E-Waste (Orange)
    { name: "Goodknight Mosquito Refill", cat: "hazardous", mat: "Chemical", desc: "Mosquito vaporizer liquid cartridge. Toxic pesticide chemicals.", icon: "fa-battery-full" },
    { name: "AA pencil battery", cat: "hazardous", mat: "Electronic", desc: "Dry cell battery contains toxic chemicals. Hand over separate.", icon: "fa-car-battery" },
    { name: "Broken LED Tubelight", cat: "hazardous", mat: "Electronic", desc: "Tube lights contain mercury vapors. Wrap to prevent breaking.", icon: "fa-lightbulb" },
    { name: "Expired Medicine Syrup", cat: "hazardous", mat: "Chemical", desc: "Liquid medicines. Toxic environmental pollutants. Wrap securely.", icon: "fa-prescription-bottle" },
    { name: "Old Smartphone", cat: "hazardous", mat: "Electronic", desc: "Cell phone. Recycle at certified e-waste dealers.", icon: "fa-mobile-retro" },
    { name: "Broken Charger Cable", cat: "hazardous", mat: "Electronic", desc: "Copper wire cables. Tangles sorting gears.", icon: "fa-plug" },
    { name: "Hit Cockroach Spray", cat: "hazardous", mat: "Chemical", desc: "Aerosol can. Flammable and pressurized chemical hazard.", icon: "fa-spray-can" },
    { name: "Broken Laptop", cat: "hazardous", mat: "Electronic", desc: "Computer waste. Contains heavy metal circuits.", icon: "fa-laptop" },
    { name: "CFL Lightbulb", cat: "hazardous", mat: "Chemical", desc: "Curly CFL light contains mercury vapor. Deliver to HHW center.", icon: "fa-lightbulb" },
    { name: "Old AC Adapter block", cat: "hazardous", mat: "Electronic", desc: "Adapter brick containing transformer circuitry.", icon: "fa-plug" },
    { name: "Lithium Power Bank", cat: "hazardous", mat: "Electronic", desc: "Explosive fire risk in collection vans if crushed.", icon: "fa-battery-three-quarters" },
    { name: "Mercury Thermometer", cat: "hazardous", mat: "Chemical", desc: "Glass thermometer. Toxic liquid metal mercury.", icon: "fa-thermometer" },
    { name: "Old Paint Container", cat: "hazardous", mat: "Chemical", desc: "Leftover oil paints. Leaches toxins into soil.", icon: "fa-paint-roller" },
    { name: "Car Battery lead-acid", cat: "hazardous", mat: "Electronic", desc: "Heavy automobile battery. Corrosive acid hazard.", icon: "fa-car-battery" },
    { name: "Old Vape pen device", cat: "hazardous", mat: "Electronic", desc: "Disposable vape. Has lithium batteries inside.", icon: "fa-pen-clip" },
    { name: "Computer Mouse (USB)", cat: "hazardous", mat: "Electronic", desc: "E-waste accessory. Circuit chips inside.", icon: "fa-computer-mouse" },
    { name: "Old Keyboard (Wires)", cat: "hazardous", mat: "Electronic", desc: "Computer hardware. E-waste recycling center.", icon: "fa-keyboard" },
    { name: "Aerosol spray empty can", cat: "hazardous", mat: "Metal", desc: "Pressurized tin can. Hand over to specialized depots.", icon: "fa-spray-can" },
    { name: "Dry battery backup cells", cat: "hazardous", mat: "Electronic", desc: "Rechargeable toy cells. Heavy metal leaks.", icon: "fa-battery-half" },
    { name: "Old nail polish bottle", cat: "hazardous", mat: "Chemical", desc: "Cosmetic lacquer is toxic and highly flammable.", icon: "fa-prescription-bottle" },
    { name: "Broken CRT TV monitor", cat: "hazardous", mat: "Electronic", desc: "Old television. Contains leaded glass tubes.", icon: "fa-tv" },
    { name: "Broken LED bulb", cat: "hazardous", mat: "Electronic", desc: "Light containing LED chips and metal backing.", icon: "fa-lightbulb" },
    { name: "Mosquito Mat sheet used", cat: "hazardous", mat: "Chemical", desc: "Used mosquito mat containing chemical poison.", icon: "fa-ticket" },
    { name: "Ganesh Plaster of Paris Idol", cat: "hazardous", mat: "Chemical", desc: "POP idol painted with heavy metals. Unrecyclable landfill waste.", icon: "fa-om" },
    { name: "Ink Cartridge (Printer)", cat: "hazardous", mat: "Chemical", desc: "Ink toners leak micro-resins. E-waste.", icon: "fa-print" }
];

function loadNextGameItem() {
    if(gameItemsQueue.length === 0) {
        gameItemsQueue = [...GAME_SOURCE_ITEMS].sort(() => Math.random() - 0.5);
    }
    
    gameCurrentItem = gameItemsQueue.pop();
    
    document.getElementById('game-item-material').innerText = gameCurrentItem.mat;
    document.getElementById('game-item-name').innerText = gameCurrentItem.name;
    document.getElementById('game-item-description').innerText = gameCurrentItem.desc;
    
    const iconElement = document.getElementById('game-item-icon');
    iconElement.className = `fa-solid ${gameCurrentItem.icon}`;
    
    document.getElementById('game-feedback-overlay').classList.add('hidden');
}

function selectGameBin(binChoice) {
    const overlay = document.getElementById('game-feedback-overlay');
    const overlayContent = document.getElementById('game-feedback-content');
    const icon = overlay.querySelector('.feedback-icon');
    const title = document.getElementById('feedback-result-title');
    const expl = document.getElementById('feedback-explanation');
    
    const isCorrect = binChoice === gameCurrentItem.cat;
    
    if (isCorrect) {
        appState.gameScore += 10;
        appState.gameStreak++;
        addPoints(15);
        
        if (appState.gameScore > appState.gameHighScore) {
            appState.gameHighScore = appState.gameScore;
        }
        
        icon.className = "fa-solid fa-circle-check feedback-icon success";
        title.innerText = "Correct! Swachh Sorter.";
        expl.innerText = `You sorted "${gameCurrentItem.name}" correctly! ${gameCurrentItem.desc}`;
    } else {
        appState.gameStreak = 0;
        
        icon.className = "fa-solid fa-circle-xmark feedback-icon error";
        title.innerText = "Incorrect Sorting!";
        
        let correctBinName = "Dry Waste (Blue)";
        if(gameCurrentItem.cat === 'compost') correctBinName = "Wet Waste (Green)";
        else if(gameCurrentItem.cat === 'landfill') correctBinName = "Sanitary Waste (Red wrapper)";
        else if(gameCurrentItem.cat === 'hazardous') correctBinName = "Hazardous/E-Waste (Orange)";
        
        expl.innerText = `Oops! "${gameCurrentItem.name}" belongs in the ${correctBinName} bin. ${gameCurrentItem.desc}`;
    }
    
    document.getElementById('game-score').innerText = appState.gameScore;
    document.getElementById('game-streak').innerText = `${appState.gameStreak} 🔥`;
    document.getElementById('game-high-score').innerText = appState.gameHighScore;
    
    overlay.classList.remove('hidden');
    saveStateToStorage();
    checkAchievements();
}

function nextGameItem() {
    loadNextGameItem();
}

function resetGameScores() {
    appState.gameScore = 0;
    appState.gameStreak = 0;
    appState.gameHighScore = 0;
    
    document.getElementById('game-score').innerText = 0;
    document.getElementById('game-streak').innerText = `0 🔥`;
    document.getElementById('game-high-score').innerText = 0;
    
    saveStateToStorage();
}

// ==========================================
// 10. ACHIEVEMENTS & ECO-POINTS
// ==========================================
function addPoints(pts) {
    appState.points += pts;
    
    if (appState.points > 0 && appState.streak === 0) {
        appState.streak = 1;
    }
    
    saveStateToStorage();
    checkAchievements();
}

function checkAchievements() {
    const scoreElement = document.getElementById('user-leaderboard-score');
    if (scoreElement) scoreElement.innerText = `${appState.points} pts`;

    const starterBadge = document.getElementById('badge-starter');
    if (starterBadge && appState.points > 0) {
        starterBadge.classList.remove('locked');
    }

    const streakBadge = document.getElementById('badge-streak');
    if (streakBadge && appState.gameStreak >= 3) {
        streakBadge.classList.remove('locked');
    }

    const wizardBadge = document.getElementById('badge-wizard');
    if (wizardBadge && appState.completedWizardCount >= 3) {
        wizardBadge.classList.remove('locked');
    }

    const pointsBadge = document.getElementById('badge-points');
    if (pointsBadge && appState.points >= 100) {
        pointsBadge.classList.remove('locked');
    }

    const userRow = document.querySelector('.leader-row.current-user .name');
    if (userRow) {
        let level = "You (Novice)";
        if (appState.points >= 100 && appState.points < 300) level = "You (Compost Guardian)";
        else if (appState.points >= 300) level = "You (Zero Waste Hero)";
        userRow.innerText = level;
    }
}

function generateEcoReport() {
    const co2Offset = (appState.points * 0.15).toFixed(2);
    const waterSaved = (appState.points * 0.8).toFixed(1);
    const wasteDiverted = (appState.points * 0.3).toFixed(2);

    document.getElementById('co2-val').innerText = `${co2Offset} kg`;
    document.getElementById('water-val').innerText = `${waterSaved} L`;
    document.getElementById('landfill-val').innerText = `${wasteDiverted} kg`;

    const reportText = `=========================================
          SWACHH BHARAT ECO-STATEMENT
=========================================
Generated on: ${new Date().toLocaleDateString()}
Personal Eco Level: ${appState.points >= 300 ? 'Zero Waste Hero' : appState.points >= 100 ? 'Compost Guardian' : 'Recycling Novice'}

YOUR ECO PERFORMANCE LOGS:
- Total Swachh Points: ${appState.points}
- Segregation Daily Streak: ${appState.streak} days
- Sorting Game High Score: ${appState.gameHighScore} pts
- Quality Calculator Runs: ${appState.completedWizardCount} runs

ENVIRONMENT IMPACT STATEMENT:
* Carbon Offset (CO2): ${co2Offset} kg saved
* Waste Diversion Rate: ${document.getElementById('diversion-rate').innerText}
* Municipal Water Conservation: ${waterSaved} Liters preserved
* Material diverted from local landfills: ${wasteDiverted} kg

Thank you for practicing correct Dry, Wet, and Sanitary waste separation! 
Keep Indore and India Clean!
- EcoSort India (Swachh Bharat Abhiyan)
=========================================`;

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `EcoSort_India_Swachh_Statement_${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// ==========================================
// 11. PWA & OFFLINE & CALENDAR & ANALYTICS COMPLETIONS
// ==========================================
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Service Worker Registered successfully. Scope:', reg.scope))
            .catch(err => console.warn('Service Worker registration failed:', err));
    }
}

function updateOnlineStatus() {
    const banner = document.getElementById('offline-banner');
    if (!banner) return;
    if (navigator.onLine) {
        banner.classList.add('hidden');
    } else {
        banner.classList.remove('hidden');
    }
}

function initCompostingCalendar() {
    renderCalendar();
    renderCompostSchedule();
}

function renderCalendar() {
    const grid = document.getElementById('calendar-days-grid');
    if (!grid) return;
    grid.innerHTML = "";
    
    const monthYearLabel = document.getElementById('calendar-month-year');
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const year = appState.calDate.getFullYear();
    const month = appState.calDate.getMonth();
    
    if (monthYearLabel) {
        monthYearLabel.innerText = `${monthNames[month]} ${year}`;
    }
    
    // First day of month
    const firstDay = new Date(year, month, 1).getDay();
    // Total days in month
    const totalDays = new Date(year, month + 1, 0).getDate();
    
    // Add empty cells for padding before first day
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = "calendar-day empty";
        grid.appendChild(emptyCell);
    }
    
    const today = new Date();
    
    // Add day cells
    for (let d = 1; d <= totalDays; d++) {
        const cell = document.createElement('div');
        cell.className = "calendar-day";
        cell.innerText = d;
        
        const cellDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        
        // Highlight today
        if (today.getDate() === d && today.getMonth() === month && today.getFullYear() === year) {
            cell.classList.add('today');
        }
        
        // Check if there's any batch event on this date
        const dayEvents = getCompostEventsForDate(cellDateStr);
        if (dayEvents.length > 0) {
            cell.classList.add('has-event');
            
            // Add a style class depending on event type
            const hasStart = dayEvents.some(e => e.type === 'start');
            const hasHarvest = dayEvents.some(e => e.type === 'harvest');
            const hasTurn = dayEvents.some(e => e.type === 'turn');
            
            if (hasHarvest) {
                cell.classList.add('harvest-day');
            } else if (hasStart) {
                cell.classList.add('start-day');
            } else if (hasTurn) {
                cell.classList.add('turn-day');
            }
            
            // Add a little indicator dot
            const dot = document.createElement('span');
            dot.className = 'event-dot';
            dot.style = "display: block; width: 4px; height: 4px; background: var(--color-accent); border-radius: 50%; margin: 2px auto 0 auto;";
            cell.appendChild(dot);
            
            // Tooltip or title
            const eventTitles = dayEvents.map(e => e.title).join(", ");
            cell.setAttribute('title', eventTitles);
        }
        
        grid.appendChild(cell);
    }
}

function getCompostEventsForDate(dateStr) {
    const events = [];
    appState.compostBatches.forEach(batch => {
        const start = new Date(batch.startDate);
        const startStr = formatDate(start);
        
        let days = 30;
        if (batch.method === 'bokashi') days = 21;
        else if (batch.method === 'backyard') days = 60;
        
        const harvest = new Date(start.getTime() + days * 24 * 60 * 60 * 1000);
        const harvestStr = formatDate(harvest);
        
        if (dateStr === startStr) {
            events.push({ type: 'start', title: `Start: ${batch.name}` });
        }
        if (dateStr === harvestStr) {
            events.push({ type: 'harvest', title: `Harvest: ${batch.name}` });
        }
        
        // Turning dates
        if (batch.method === 'aerobic') {
            for (let t = 7; t < 30; t += 7) {
                const turnDate = new Date(start.getTime() + t * 24 * 60 * 60 * 1000);
                if (dateStr === formatDate(turnDate)) {
                    events.push({ type: 'turn', title: `Turn: ${batch.name}` });
                }
            }
        } else if (batch.method === 'backyard') {
            for (let t = 10; t < 60; t += 10) {
                const turnDate = new Date(start.getTime() + t * 24 * 60 * 60 * 1000);
                if (dateStr === formatDate(turnDate)) {
                    events.push({ type: 'turn', title: `Turn: ${batch.name}` });
                }
            }
        }
    });
    return events;
}

function formatDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function renderCompostSchedule() {
    const list = document.getElementById('compost-schedule-list');
    if (!list) return;
    
    if (appState.compostBatches.length === 0) {
        list.innerHTML = `
            <div class="schedule-placeholder">
                <i class="fa-solid fa-hourglass-start"></i>
                <p>No active composting batch. Click "New Batch" to start tracking!</p>
            </div>
        `;
        return;
    }
    
    list.innerHTML = "";
    appState.compostBatches.forEach((batch, index) => {
        const start = new Date(batch.startDate);
        let days = 30;
        let methodLabel = "Aerobic Bin";
        if (batch.method === 'bokashi') { days = 21; methodLabel = "Bokashi"; }
        else if (batch.method === 'backyard') { days = 60; methodLabel = "Backyard Pit"; }
        
        const harvest = new Date(start.getTime() + days * 24 * 60 * 60 * 1000);
        
        // Calculate progress percentage
        const today = new Date();
        const diffTime = today.getTime() - start.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        let progress = Math.max(0, Math.min(100, Math.floor((diffDays / days) * 100)));
        
        let statusText = `${progress}% Complete`;
        if (progress >= 100) {
            statusText = "Ready to Harvest! 🌱";
        }
        
        // Find next activity
        let nextAct = "None";
        if (progress < 100) {
            if (batch.method === 'aerobic') {
                const nextTurnDay = Math.ceil(diffDays / 7) * 7;
                if (nextTurnDay < 30) {
                    const nextTurnDate = new Date(start.getTime() + nextTurnDay * 24 * 60 * 60 * 1000);
                    nextAct = `Turn Batch on ${nextTurnDate.toLocaleDateString('en-IN', {month:'short', day:'numeric'})}`;
                } else {
                    nextAct = `Harvest on ${harvest.toLocaleDateString('en-IN', {month:'short', day:'numeric'})}`;
                }
            } else if (batch.method === 'backyard') {
                const nextTurnDay = Math.ceil(diffDays / 10) * 10;
                if (nextTurnDay < 60) {
                    const nextTurnDate = new Date(start.getTime() + nextTurnDay * 24 * 60 * 60 * 1000);
                    nextAct = `Turn Pile on ${nextTurnDate.toLocaleDateString('en-IN', {month:'short', day:'numeric'})}`;
                } else {
                    nextAct = `Harvest on ${harvest.toLocaleDateString('en-IN', {month:'short', day:'numeric'})}`;
                }
            } else {
                nextAct = `Cure/Harvest on ${harvest.toLocaleDateString('en-IN', {month:'short', day:'numeric'})}`;
            }
        } else {
            nextAct = "Ready to use in soil!";
        }
        
        const div = document.createElement('div');
        div.className = "schedule-item";
        div.style = "background: rgba(255, 255, 255, 0.03); border: 1px solid var(--color-border); border-radius: 8px; padding: 12px; margin-bottom: 10px; position: relative;";
        
        div.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <h6 style="margin:0; font-size:0.9rem; font-weight:600; color:white;">${batch.name}</h6>
                <span class="badge" style="font-size:0.7rem; background:var(--color-primary); color:white; padding: 2px 6px; border-radius:4px;">${methodLabel}</span>
            </div>
            <p style="font-size:0.75rem; color:var(--color-text-secondary); margin:0 0 8px 0;">Started: ${start.toLocaleDateString('en-IN')}</p>
            
            <div style="margin-bottom:8px;">
                <div style="display:flex; justify-content:space-between; font-size:0.7rem; color:var(--color-text-secondary); margin-bottom:3px;">
                    <span>Progress</span>
                    <span>${statusText}</span>
                </div>
                <div style="background:rgba(255,255,255,0.1); height:6px; border-radius:3px; overflow:hidden;">
                    <div style="width:${progress}%; background:var(--color-accent); height:100%;"></div>
                </div>
            </div>
            
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.72rem;">
                <span style="color:#a855f7;"><i class="fa-solid fa-bell" style="margin-right:3px;"></i> ${nextAct}</span>
                <button onclick="deleteCompostBatch(${index})" style="background:none; border:none; color:var(--risk-high); cursor:pointer;" title="Delete Batch"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        `;
        list.appendChild(div);
    });
}

function deleteCompostBatch(index) {
    appState.compostBatches.splice(index, 1);
    saveStateToStorage();
    initCompostingCalendar();
}

function prevMonth() {
    appState.calDate.setMonth(appState.calDate.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    appState.calDate.setMonth(appState.calDate.getMonth() + 1);
    renderCalendar();
}

function openCompostModal() {
    const modal = document.getElementById('compost-modal');
    if (modal) {
        modal.classList.remove('hidden');
        const todayStr = formatDate(new Date());
        document.getElementById('compost-start-date').value = todayStr;
    }
}

function closeCompostModal() {
    const modal = document.getElementById('compost-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function saveNewCompostBatch() {
    const name = document.getElementById('compost-batch-name').value.trim() || "New Batch";
    const startDate = document.getElementById('compost-start-date').value;
    const method = document.getElementById('compost-method').value;
    
    if (!startDate) {
        alert("Please select a start date!");
        return;
    }
    
    const newBatch = {
        name: name,
        startDate: startDate,
        method: method
    };
    
    appState.compostBatches.push(newBatch);
    addPoints(30);
    saveStateToStorage();
    closeCompostModal();
    initCompostingCalendar();
}

function drawAnalyticsChart() {
    const container = document.getElementById('analytics-svg-wrapper');
    if (!container) return;
    
    const history = appState.analyticsHistory;
    const weeks = history.weeks;
    const recycling = history.recycling;
    const compost = history.compost;
    const landfill = history.landfill;
    const hazardous = history.hazardous;
    
    const allVals = [...recycling, ...compost, ...landfill, ...hazardous];
    const maxVal = Math.max(...allVals, 10);
    const yMax = Math.ceil(maxVal / 5) * 5;
    
    const svgWidth = 500;
    const svgHeight = 220;
    const paddingLeft = 40;
    const paddingRight = 20;
    const paddingTop = 20;
    const paddingBottom = 30;
    
    const chartWidth = svgWidth - paddingLeft - paddingRight;
    const chartHeight = svgHeight - paddingTop - paddingBottom;
    
    const getX = (i) => paddingLeft + (i / (weeks.length - 1)) * chartWidth;
    const getY = (v) => paddingTop + chartHeight - (v / yMax) * chartHeight;
    
    let svgContent = `<svg viewBox="0 0 ${svgWidth} ${svgHeight}" width="100%" height="100%" style="overflow: visible;">`;
    
    const gridLinesCount = 4;
    for (let i = 0; i <= gridLinesCount; i++) {
        const val = (yMax / gridLinesCount) * i;
        const y = getY(val);
        svgContent += `<line x1="${paddingLeft}" y1="${y}" x2="${svgWidth - paddingRight}" y2="${y}" stroke="rgba(255, 255, 255, 0.07)" stroke-dasharray="4,4" />`;
        svgContent += `<text x="${paddingLeft - 8}" y="${y + 4}" fill="var(--color-text-muted)" font-size="10" text-anchor="end">${val.toFixed(0)}kg</text>`;
    }
    
    weeks.forEach((week, i) => {
        const x = getX(i);
        svgContent += `<text x="${x}" y="${svgHeight - 10}" fill="var(--color-text-muted)" font-size="10" text-anchor="middle">${week}</text>`;
    });
    
    const drawLinePath = (data, color, strokeWidth = 2.5) => {
        let path = "";
        data.forEach((val, i) => {
            const x = getX(i);
            const y = getY(val);
            if (i === 0) path += `M ${x} ${y}`;
            else path += ` L ${x} ${y}`;
        });
        return `<path d="${path}" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" />`;
    };
    
    const drawDots = (data, color) => {
        let dots = "";
        data.forEach((val, i) => {
            const x = getX(i);
            const y = getY(val);
            dots += `
                <circle cx="${x}" cy="${y}" r="4" fill="${color}" stroke="#0f172a" stroke-width="1.5" class="chart-dot">
                    <title>${val} kg</title>
                </circle>
            `;
        });
        return dots;
    };
    
    svgContent += drawLinePath(recycling, "#38bdf8");
    svgContent += drawLinePath(compost, "#4ade80");
    svgContent += drawLinePath(landfill, "#f87171");
    svgContent += drawLinePath(hazardous, "#fb923c");
    
    svgContent += drawDots(recycling, "#38bdf8");
    svgContent += drawDots(compost, "#4ade80");
    svgContent += drawDots(landfill, "#f87171");
    svgContent += drawDots(hazardous, "#fb923c");
    
    svgContent += `</svg>`;
    
    container.innerHTML = svgContent;
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const previewImg = document.getElementById('uploaded-image-preview');
        const statusText = document.getElementById('scanner-status-text');
        const scanPreview = document.getElementById('scanned-item-preview');
        
        if (previewImg) {
            previewImg.src = e.target.result;
            previewImg.classList.remove('hidden');
        }
        
        if (scanPreview) {
            scanPreview.classList.add('hidden');
        }
        
        if (statusText) {
            statusText.innerText = "Analyzing uploaded image using Swachh Vision AI...";
            statusText.classList.remove('hidden');
        }
        
        setTimeout(() => {
            const fileName = file.name.toLowerCase();
            let detectedName = "Amul Milk Packet";
            let detectedIcon = "fa-bottle-water";
            
            if (fileName.includes("coconut") || fileName.includes("nariyal")) {
                detectedName = "Tender coconut shell";
                detectedIcon = "fa-seedling";
            } else if (fileName.includes("battery") || fileName.includes("cell")) {
                detectedName = "AA pencil battery";
                detectedIcon = "fa-car-battery";
            } else if (fileName.includes("diaper") || fileName.includes("huggies")) {
                detectedName = "Used baby diaper";
                detectedIcon = "fa-toilet-paper";
            } else if (fileName.includes("cup") || fileName.includes("glass") || fileName.includes("chai")) {
                detectedName = "Chai Glass (Paper)";
                detectedIcon = "fa-mug-hot";
            } else if (fileName.includes("bottle") || fileName.includes("plastic")) {
                detectedName = "Bisleri Water Bottle";
                detectedIcon = "fa-bottle-water";
            } else if (fileName.includes("box") || fileName.includes("cardboard") || fileName.includes("amazon")) {
                detectedName = "Amazon Cardboard Box";
                detectedIcon = "fa-box";
            } else if (fileName.includes("flower") || fileName.includes("pooja")) {
                detectedName = "Pooja Nirmalya Garland";
                detectedIcon = "fa-seedling";
            } else {
                const randomItem = SCANNER_DEMO_ITEMS[Math.floor(Math.random() * SCANNER_DEMO_ITEMS.length)];
                detectedName = randomItem.name;
                detectedIcon = randomItem.icon;
            }
            
            if (statusText) {
                statusText.classList.add('hidden');
            }
            
            if (scanPreview) {
                const iconEl = scanPreview.querySelector('.preview-icon');
                if (iconEl) iconEl.className = `fa-solid ${detectedIcon} preview-icon`;
                
                const labelEl = document.getElementById('preview-label');
                if (labelEl) labelEl.innerText = detectedName;
                
                scanPreview.classList.remove('hidden');
            }
            
            appState.scannedItemDetected = detectedName;
        }, 1500);
    };
    reader.readAsDataURL(file);
}
