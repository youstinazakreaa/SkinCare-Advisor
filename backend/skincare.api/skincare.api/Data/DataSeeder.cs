using skincare.api.Models;

namespace skincare.api.Data
{
    public static class DataSeeder
    {
        public static void Seed(AppDbContext context)
        {
            if (context.Products.Any())
                return;

            var products = new List<Product>
            {
                // ================= AFFORDABLE - MORNING (EGYPTIAN / LOCAL) =================
                new Product
                {
                    Name = "Eva Skin Clinic Hyaluronic Acid Facial Wash",
                    Brand = "Eva",
                    Category = "Cleanser",
                    Budget = "Affordable",
                    MatchesStep = "Cleanser",
                    Period = "Morning",
                    ImageUrl = "assets/images/products/eva-skin-clinic-hyaluronic-cleanser.jpg.jpg",
                    Description = "Affordable hydrating facial wash suitable for daily cleansing."
                },
                new Product
                {
                    Name = "Infinity Facial Cleanser",
                    Brand = "Infinity",
                    Category = "Cleanser",
                    Budget = "Affordable",
                    MatchesStep = "Cleanser",
                    Period = "Morning",
                    ImageUrl = "assets/images/products/infinity-facial-wash.jpg.jpg",
                    Description = "Gentle cleanser that helps clean the skin without over-drying."
                },
                new Product
                {
                    Name = "The Purest Solutions Niacinamide Serum",
                    Brand = "The Purest Solutions",
                    Category = "Serum",
                    Budget = "Affordable",
                    MatchesStep = "Niacinamide",
                    Period = "Morning",
                    ImageUrl = "assets/images/products/the-purest-solutions-niacinamide.jpg.jpg",
                    Description = "Helps improve the look of pores, oiliness and uneven skin texture."
                },
                new Product
                {
                    Name = "Eva Skin Clinic Vitamin C Serum",
                    Brand = "Eva",
                    Category = "Serum",
                    Budget = "Affordable",
                    MatchesStep = "Vitamin C",
                    Period = "Morning",
                    ImageUrl = "assets/images/products/eva-vitamin-c-serum.jpg.jpg",
                    Description = "Brightening serum for dull skin and uneven tone."
                },
                new Product
                {
                    Name = "Eva Skin Clinic Hyaluronic Acid Serum",
                    Brand = "Eva",
                    Category = "Serum",
                    Budget = "Affordable",
                    MatchesStep = "Hydrating Serum",
                    Period = "Morning",
                    ImageUrl = "assets/images/products/eva-moisturizing-cream.jpg.jpg",
                    Description = "Hydrating serum for dehydrated skin and daily moisture support."
                },
                new Product
                {
                    Name = "Eva Daily Moisturizing Cream",
                    Brand = "Eva",
                    Category = "Moisturizer",
                    Budget = "Affordable",
                    MatchesStep = "Moisturizer",
                    Period = "Morning",
                    ImageUrl = "assets/images/products/eva-honey-moisturizing-cream.jpg.jpg",
                    Description = "Simple daily moisturizer for basic hydration."
                },
                new Product
                {
                    Name = "Infinity Soothing & Moisturizing Gel",
                    Brand = "Infinity",
                    Category = "Moisturizer",
                    Budget = "Affordable",
                    MatchesStep = "Moisturizer",
                    Period = "Morning",
                  ImageUrl = "assets/images/products/infinity-soothing-moisturizing-gel.jpg",
                    Description = "Lightweight moisturizing gel suitable for oily and combination skin."
                },
                new Product
                {
                    Name = "Eva Sun & Sea SPF 50",
                    Brand = "Eva",
                    Category = "Sunscreen",
                    Budget = "Affordable",
                    MatchesStep = "Sunscreen",
                    Period = "Morning",
                    ImageUrl = "assets/images/products/eva-sun-and-sea-spf50.jpg.jpg",
                    Description = "Affordable sunscreen for daily sun protection."
                },
                new Product
                {
                    Name = "Beesline Sunscreen SPF 50",
                    Brand = "Beesline",
                    Category = "Sunscreen",
                    Budget = "Affordable",
                    MatchesStep = "Sunscreen",
                    Period = "Morning",
                    ImageUrl = "assets/images/products/beesline-sunscreen-spf50.jpg",
                    Description = "Daily sunscreen option for UV protection."
                },

                // ================= AFFORDABLE - NIGHT (EGYPTIAN / LOCAL) =================
                new Product
                {
                    Name = "Starville Micellar Water",
                    Brand = "Starville",
                    Category = "Cleanser",
                    Budget = "Affordable",
                    MatchesStep = "Makeup Remover",
                    Period = "Night",
                    ImageUrl = "assets/images/products/starville-acne-prone-skin-cleanser.jpg.jpg",
                    Description = "Removes makeup, sunscreen and daily impurities."
                },
                new Product
                {
                    Name = "Eva Skin Clinic Cleanser",
                    Brand = "Eva",
                    Category = "Cleanser",
                    Budget = "Affordable",
                    MatchesStep = "Cleanser",
                    Period = "Night",
                    ImageUrl = "assets/images/products/eva-skin-clinic-hyaluronic-cleanser.jpg.jpg",
                    Description = "Gentle cleanser for the night routine."
                },
                new Product
                {
                    Name = "Infinity Purifying Cleanser",
                    Brand = "Infinity",
                    Category = "Cleanser",
                    Budget = "Affordable",
                    MatchesStep = "Cleanser",
                    Period = "Night",
                    ImageUrl = "assets/images/products/infinity-facial-wash.jpg.jpg",
                    Description = "Purifying cleanser that helps remove excess oil and impurities."
                },
                new Product
                {
                    Name = "Starville Acne Prone Skin Cream",
                    Brand = "Starville",
                    Category = "Treatment",
                    Budget = "Affordable",
                    MatchesStep = "Acne Treatment",
                    Period = "Night",
                    ImageUrl = "assets/images/products/starville-acne-prone-skin-cream.jpg.jpg",
                    Description = "Targets acne-prone skin and blemishes."
                },
                new Product
                {
                    Name = "The Purest Solutions Salicylic Acid Serum",
                    Brand = "The Purest Solutions",
                    Category = "Exfoliant",
                    Budget = "Affordable",
                    MatchesStep = "AHA/BHA",
                    Period = "Night",
                    ImageUrl = "assets/images/products/the-purest-solutions-salicylic-acid.jpg.jpg",
                    Description = "Helps clear pores and improve skin texture."
                },
                new Product
                {
                    Name = "Eva Skin Clinic Vitamin A Serum",
                    Brand = "Eva",
                    Category = "Treatment",
                    Budget = "Affordable",
                    MatchesStep = "Retinol",
                    Period = "Night",
                    ImageUrl = "assets/images/products/eva-vitamin-a-serum.jpg.jpg",
                    Description = "Night treatment for texture and early aging signs."
                },
                new Product
                {
                    Name = "Starville Moisturizing Cream",
                    Brand = "Starville",
                    Category = "Moisturizer",
                    Budget = "Affordable",
                    MatchesStep = "Moisturizer",
                    Period = "Night",
                    ImageUrl = "assets/images/products/starville-whitening-cream.jpg.jpg",
                    Description = "Night moisturizer that supports skin comfort and hydration."
                },
                new Product
                {
                    Name = "Infinity Cica Repair Cream",
                    Brand = "Infinity",
                    Category = "Moisturizer",
                    Budget = "Affordable",
                    MatchesStep = "Barrier Repair",
                    Period = "Night",
                 ImageUrl = "assets/images/products/infinity-cica-repair-cream.jpg",
                    Description = "Supports skin barrier repair and calming overnight."
                },

                // ================= MID-RANGE - MORNING =================
                new Product
                {
                    Name = "CeraVe Hydrating Cleanser",
                    Brand = "CeraVe",
                    Category = "Cleanser",
                    Budget = "Mid-range",
                    MatchesStep = "Cleanser",
                    Period = "Morning",
                    ImageUrl = "assets/images/products/cerave- Hydrating cleanser.jpg.jpg",
                    Description = "Hydrating cleanser with ceramides for normal to dry skin."
                },
                new Product
                {
                    Name = "La Roche-Posay Effaclar Gel Cleanser",
                    Brand = "La Roche-Posay",
                    Category = "Cleanser",
                    Budget = "Mid-range",
                    MatchesStep = "Cleanser",
                    Period = "Morning",
                    ImageUrl = "assets/images/products/la-roche-posay-effaclar-gel-cleanser.jpg.jpg",
                    Description = "Cleanser suitable for oily and acne-prone skin."
                },
                new Product
                {
                    Name = "Bioderma Sensibio Gel Moussant",
                    Brand = "Bioderma",
                    Category = "Cleanser",
                    Budget = "Mid-range",
                    MatchesStep = "Cleanser",
                    Period = "Morning",
                    ImageUrl = "assets/images/products/bioderma-sensibio-gel-moussant-pink.jpg.jpg",
                    Description = "Gentle cleanser for sensitive skin."
                },
                new Product
                {
                    Name = "The Ordinary Niacinamide 10% + Zinc 1%",
                    Brand = "The Ordinary",
                    Category = "Serum",
                    Budget = "Mid-range",
                    MatchesStep = "Niacinamide",
                    Period = "Morning",
                    ImageUrl = "assets/images/products/the-ordinary-niacinamide-10-zinc-1.jpg.jpg",
                    Description = "Helps reduce excess oil and visible pores."
                },
                new Product
                {
                    Name = "Vichy Mineral 89 Serum",
                    Brand = "Vichy",
                    Category = "Serum",
                    Budget = "Mid-range",
                    MatchesStep = "Hydrating Serum",
                    Period = "Morning",
                    ImageUrl = "assets/images/products/vichy-mineral-89-serum.jpg.jpg",
                    Description = "Hydrating serum with hyaluronic acid."
                },
                new Product
                {
                    Name = "La Roche-Posay Pure Vitamin C10",
                    Brand = "La Roche-Posay",
                    Category = "Serum",
                    Budget = "Mid-range",
                    MatchesStep = "Vitamin C",
                    Period = "Morning",
                    ImageUrl = "assets/images/products/la-roche-posay-pure-vitamin-c10.jpg",
                    Description = "Vitamin C serum for glow and uneven skin tone."
                },
                new Product
                {
                    Name = "Neutrogena Hydro Boost Water Gel",
                    Brand = "Neutrogena",
                    Category = "Moisturizer",
                    Budget = "Mid-range",
                    MatchesStep = "Moisturizer",
                    Period = "Morning",
                    ImageUrl = "assets/images/products/neutrogena-hydro-boost-water-gel.jpg.jpg",
                    Description = "Lightweight gel moisturizer for hydrated skin."
                },
                new Product
                {
                    Name = "Bioderma Atoderm Cream",
                    Brand = "Bioderma",
                    Category = "Moisturizer",
                    Budget = "Mid-range",
                    MatchesStep = "Moisturizer",
                    Period = "Morning",
                    ImageUrl = "assets/images/products/bioderma-atoderm-cream.jpg",
                    Description = "Moisturizer for dry and sensitive skin."
                },
                new Product
                {
                    Name = "Bioderma Photoderm SPF 50",
                    Brand = "Bioderma",
                    Category = "Sunscreen",
                    Budget = "Mid-range",
                    MatchesStep = "Sunscreen",
                    Period = "Morning",
                    ImageUrl = "assets/images/products/bioderma-photoderm-spf50.jpg",
                    Description = "Daily high protection sunscreen."
                },
                new Product
                {
                    Name = "La Roche-Posay Anthelios Oil Control SPF 50",
                    Brand = "La Roche-Posay",
                    Category = "Sunscreen",
                    Budget = "Mid-range",
                    MatchesStep = "Sunscreen",
                    Period = "Morning",
                    ImageUrl = "assets/images/products/la-roche-posay-anthelios-spf50.jpg.jpg",
                    Description = "Sunscreen suitable for oily and acne-prone skin."
                },

                // ================= MID-RANGE - NIGHT =================
                new Product
                {
                    Name = "CeraVe Foaming Cleanser",
                    Brand = "CeraVe",
                    Category = "Cleanser",
                    Budget = "Mid-range",
                    MatchesStep = "Cleanser",
                    Period = "Night",
                    ImageUrl = "assets/images/products/cerave-foaming cleanser.jpg.jpg",
                    Description = "Foaming cleanser for normal to oily skin."
                },
                new Product
                {
                    Name = "Bioderma Sebium Gel Moussant",
                    Brand = "Bioderma",
                    Category = "Cleanser",
                    Budget = "Mid-range",
                    MatchesStep = "Cleanser",
                    Period = "Night",
                    ImageUrl = "assets/images/products/bioderma-sebium-gel-moussant.jpg",
                    Description = "Night cleanser for oily and combination skin."
                },
                new Product
                {
                    Name = "La Roche-Posay Toleriane Cleanser",
                    Brand = "La Roche-Posay",
                    Category = "Cleanser",
                    Budget = "Mid-range",
                    MatchesStep = "Cleanser",
                    Period = "Night",
                    ImageUrl = "assets/images/products/la-roche-posay-toleriane-cleanser.jpg.jpg",
                    Description = "Gentle cleanser for sensitive skin."
                },
                new Product
                {
                    Name = "Paula's Choice 2% BHA Liquid",
                    Brand = "Paula's Choice",
                    Category = "Exfoliant",
                    Budget = "Mid-range",
                    MatchesStep = "AHA/BHA",
                    Period = "Night",
                    ImageUrl = "assets/images/products/paulas-choice-2-percent-bha-liquid.jpg",
                    Description = "Helps unclog pores and smooth skin texture."
                },
                new Product
                {
                    Name = "The Ordinary Lactic Acid 5%",
                    Brand = "The Ordinary",
                    Category = "Exfoliant",
                    Budget = "Mid-range",
                    MatchesStep = "AHA/BHA",
                    Period = "Night",
                    ImageUrl = "assets/images/products/the-ordinary-lactic-acid-5-percent.jpg",
                    Description = "Gentle exfoliating treatment for uneven texture."
                },
                new Product
                {
                    Name = "The Inkey List Retinol Serum",
                    Brand = "The Inkey List",
                    Category = "Treatment",
                    Budget = "Mid-range",
                    MatchesStep = "Retinol",
                    Period = "Night",
                    ImageUrl = "assets/images/products/the-inkey-list-retinol-serum.jpg.jpg",
                    Description = "Retinol treatment suitable for beginners."
                },
                new Product
                {
                    Name = "La Roche-Posay Effaclar Duo+",
                    Brand = "La Roche-Posay",
                    Category = "Treatment",
                    Budget = "Mid-range",
                    MatchesStep = "Acne Treatment",
                    Period = "Night",
                    ImageUrl = "assets/images/products/la-roche-posay-effaclar-duo.jpg.jpg",
                    Description = "Targets blemishes and acne marks."
                },
                new Product
                {
                    Name = "Avène Cicalfate Repair Cream",
                    Brand = "Avène",
                    Category = "Moisturizer",
                    Budget = "Mid-range",
                    MatchesStep = "Barrier Repair",
                    Period = "Night",
                    ImageUrl = "assets/images/products/avene-cicalfate-repair-cream.jpg",
                    Description = "Repairing cream for irritated skin barrier."
                },
                new Product
                {
                    Name = "Bioderma Sebium Hydra",
                    Brand = "Bioderma",
                    Category = "Moisturizer",
                    Budget = "Mid-range",
                    MatchesStep = "Moisturizer",
                    Period = "Night",
                    ImageUrl = "assets/images/products/bioderma-sebium-hydra.jpg.jpg",
                    Description = "Moisturizer for acne-prone skin affected by treatments."
                },
                new Product
                {
                    Name = "CeraVe Moisturizing Cream",
                    Brand = "CeraVe",
                    Category = "Moisturizer",
                    Budget = "Mid-range",
                    MatchesStep = "Moisturizer",
                    Period = "Night",
                    ImageUrl = "assets/images/products/cerave-foaming cleanser.jpg.jpg",
                    Description = "Rich moisturizer supporting the skin barrier."
                },

                // ================= PREMIUM - MORNING =================
                new Product
                {
                    Name = "Kiehl's Ultra Facial Cleanser",
                    Brand = "Kiehl's",
                    Category = "Cleanser",
                    Budget = "Premium",
                    MatchesStep = "Cleanser",
                    Period = "Morning",
                    ImageUrl = "assets/images/products/kiehls-ultra-facial-cleanser.jpg.jpg",
                    Description = "Premium gentle cleanser for daily use."
                },
                new Product
                {
                    Name = "Dermalogica Special Cleansing Gel",
                    Brand = "Dermalogica",
                    Category = "Cleanser",
                    Budget = "Premium",
                    MatchesStep = "Cleanser",
                    Period = "Morning",
                    ImageUrl = "assets/images/products/dermalogica-special-cleansing-gel.jpg.jpg",
                    Description = "Soap-free cleanser for a fresh finish."
                },
                new Product
                {
                    Name = "Tatcha The Rice Wash",
                    Brand = "Tatcha",
                    Category = "Cleanser",
                    Budget = "Premium",
                    MatchesStep = "Cleanser",
                    Period = "Morning",
                    ImageUrl = "assets/images/products/tatcha-the-rice-wash.jpg.jpg",
                    Description = "Cream cleanser for soft and smooth skin."
                },
                new Product
                {
                    Name = "SkinCeuticals C E Ferulic",
                    Brand = "SkinCeuticals",
                    Category = "Serum",
                    Budget = "Premium",
                   MatchesStep = "Vitamin C",
                    Period = "Morning",
                    ImageUrl = "assets/images/products/skinceuticals-c-e-ferulic.jpg.jpg",
                    Description = "Advanced antioxidant vitamin C serum."
                },
                new Product
                {
                    Name = "Drunk Elephant B-Hydra Serum",
                    Brand = "Drunk Elephant",
                    Category = "Serum",
                    Budget = "Premium",
                    MatchesStep = "Hydrating Serum",
                    Period = "Morning",
                    ImageUrl = "assets/images/products/drunk-elephant-lala-retro-cream-purple.jpg.jpg",
                    Description = "Hydrating serum for plump-looking skin."
                },
                new Product
                {
                    Name = "Medik8 C-Tetra Serum",
                    Brand = "Medik8",
                    Category = "Serum",
                    Budget = "Premium",
                    MatchesStep = "Vitamin C",
                    Period = "Morning",
                    ImageUrl = "assets/images/products/medik8-c-tetra-serum.jpg.jpg",
                    Description = "Vitamin C serum for bright and healthy-looking skin."
                },
                new Product
                {
                    Name = "Clinique Moisture Surge",
                    Brand = "Clinique",
                    Category = "Moisturizer",
                    Budget = "Premium",
                    MatchesStep = "Moisturizer",
                    Period = "Morning",
                    ImageUrl = "assets/images/products/clinique-moisture-surge.jpg.jpg",
                    Description = "Hydrating gel cream for smooth skin."
                },
                new Product
                {
                    Name = "Kiehl's Ultra Facial Cream",
                    Brand = "Kiehl's",
                    Category = "Moisturizer",
                    Budget = "Premium",
                    MatchesStep = "Moisturizer",
                    Period = "Morning",
                    ImageUrl = "assets/images/products/kiehls-ultra-facial-cream.jpg.jpg",
                    Description = "Premium moisturizer for daily hydration."
                },
                new Product
                {
                    Name = "La Roche-Posay Anthelios SPF 50",
                    Brand = "La Roche-Posay",
                    Category = "Sunscreen",
                    Budget = "Premium",
                    MatchesStep = "Sunscreen",
                    Period = "Morning",
                    ImageUrl = "assets/images/products/la-roche-posay-anthelios-spf50.jpg.jpg",
                    Description = "Advanced daily sun protection."
                },
                new Product
                {
                    Name = "Supergoop Unseen Sunscreen SPF 40",
                    Brand = "Supergoop",
                    Category = "Sunscreen",
                    Budget = "Premium",
                    MatchesStep = "Sunscreen",
                    Period = "Morning",
                    ImageUrl = "assets/images/products/supergoop-unseen-sunscreen-spf40.jpg",
                    Description = "Invisible sunscreen suitable under makeup."
                },

                // ================= PREMIUM - NIGHT =================
                new Product
                {
                    Name = "Dermalogica PreCleanse",
                    Brand = "Dermalogica",
                    Category = "Cleanser",
                    Budget = "Premium",
                    MatchesStep = "Makeup Remover",
                    Period = "Night",
                    ImageUrl = "assets/images/products/dermalogica-precleanse.jpg.jpg",
                    Description = "Oil cleanser for removing makeup and sunscreen."
                },
                new Product
                {
                    Name = "Tatcha Rice Wash Cleanser",
                    Brand = "Tatcha",
                    Category = "Cleanser",
                    Budget = "Premium",
                    MatchesStep = "Cleanser",
                    Period = "Night",
                    ImageUrl = "assets/images/products/tatcha-the-rice-wash.jpg.jpg",
                    Description = "Premium cleanser for soft skin."
                },
                new Product
                {
                    Name = "Sunday Riley Good Genes",
                    Brand = "Sunday Riley",
                    Category = "Exfoliant",
                    Budget = "Premium",
                    MatchesStep = "AHA/BHA",
                    Period = "Night",
                    ImageUrl = "assets/images/products/sunday-riley-good-genes.jpg.jpg",
                    Description = "Lactic acid treatment for glow and texture."
                },
                new Product
                {
                    Name = "Drunk Elephant T.L.C. Framboos",
                    Brand = "Drunk Elephant",
                    Category = "Exfoliant",
                    Budget = "Premium",
                    MatchesStep = "AHA/BHA",
                    Period = "Night",
                    ImageUrl = "assets/images/products/drunk-elephant-tlc-framboos.jpg.jpg",
                    Description = "Night exfoliating serum for texture."
                },
                new Product
                {
                    Name = "Medik8 Crystal Retinal",
                    Brand = "Medik8",
                    Category = "Treatment",
                    Budget = "Premium",
                   MatchesStep = "Retinol",
                    Period = "Night",
                    ImageUrl = "assets/images/products/medik8-crystal-retinal.jpg",
                    Description = "Advanced retinal night treatment."
                },
                new Product
                {
                    Name = "Murad Rapid Relief Acne Spot Treatment",
                    Brand = "Murad",
                    Category = "Treatment",
                    Budget = "Premium",
                    MatchesStep = "Acne Treatment",
                    Period = "Night",
                    ImageUrl = "assets/images/products/murad-rapid-relief-acne-spot-treatment.jpg",
                    Description = "Spot treatment for blemishes."
                },
                new Product
                {
                    Name = "Drunk Elephant Lala Retro Cream",
                    Brand = "Drunk Elephant",
                    Category = "Moisturizer",
                    Budget = "Premium",
                    MatchesStep = "Moisturizer",
                    Period = "Night",
                    ImageUrl = "assets/images/products/drunk-elephant-lala-retro-whipped-cream.jpg.jpg",
                    Description = "Rich night moisturizer for barrier support."
                },
                new Product
                {
                    Name = "SkinCeuticals Triple Lipid Restore",
                    Brand = "SkinCeuticals",
                    Category = "Moisturizer",
                    Budget = "Premium",
                    MatchesStep = "Barrier Repair",
                    Period = "Night",
                    ImageUrl = "assets/images/products/skinceuticals-triple-lipid-restore.jpg.jpg",
                    Description = "Premium barrier-supporting night cream."
                },
                new Product
                {
                    Name = "Anua Heartleaf Pore Control Cleansing Oil",
                    Brand = "Anua",
                    Category = "Cleanser",
                    Budget = "Premium",
                    MatchesStep = "Makeup Remover",
                    Period = "Night",
                    ImageUrl = "https://via.placeholder.com/300",
                    Description = "Cleansing oil that removes makeup and sunscreen gently."
                },
                new Product
                {
                    Name = "Kiehl's Midnight Recovery Cream",
                    Brand = "Kiehl's",
                    Category = "Moisturizer",
                    Budget = "Premium",
                    MatchesStep = "Moisturizer",
                    Period = "Night",
                    ImageUrl = "assets/images/products/kiehls-midnight-recovery.jpg.jpg",
                    Description = "Night cream for recovery and hydration."
                },
            };

            context.Products.AddRange(products);

            var conflicts = new List<ProductConflict>
            {
                new ProductConflict
                {
                    ProductOne = "Retinol",
                    ProductTwo = "AHA/BHA",
                    Reason = "Do not use retinol and exfoliating acids in the same routine because this may cause irritation, dryness, and redness."
                },
                new ProductConflict
                {
                    ProductOne = "Retinol",
                    ProductTwo = "Vitamin C",
                    Reason = "It is better to use vitamin C in the morning and retinol at night to reduce irritation."
                },
                new ProductConflict
                {
                    ProductOne = "Retinol",
                    ProductTwo = "Benzoyl Peroxide",
                    Reason = "This combination can be too harsh and may increase peeling, irritation, and sensitivity."
                },
                new ProductConflict
                {
                    ProductOne = "Retinol",
                    ProductTwo = "Physical Scrub",
                    Reason = "Scrubbing while using retinol can irritate the skin and weaken the skin barrier."
                },
                new ProductConflict
                {
                    ProductOne = "Vitamin C",
                    ProductTwo = "Benzoyl Peroxide",
                    Reason = "Benzoyl peroxide may reduce the effectiveness of vitamin C and may irritate sensitive skin."
                },
                new ProductConflict
                {
                    ProductOne = "Vitamin C",
                    ProductTwo = "AHA/BHA",
                    Reason = "Using strong acids with vitamin C may irritate sensitive skin. It is better to separate them."
                },
                new ProductConflict
                {
                    ProductOne = "AHA/BHA",
                    ProductTwo = "Benzoyl Peroxide",
                    Reason = "Using exfoliating acids with benzoyl peroxide may over-dry the skin and damage the skin barrier."
                },
                new ProductConflict
                {
                    ProductOne = "AHA/BHA",
                    ProductTwo = "Physical Scrub",
                    Reason = "Using chemical exfoliation with physical scrubs may cause over-exfoliation."
                },
                new ProductConflict
                {
                    ProductOne = "AHA/BHA",
                    ProductTwo = "Sensitive Skin",
                    Reason = "Sensitive skin should avoid frequent exfoliation and start slowly."
                },
                new ProductConflict
                {
                    ProductOne = "Multiple Exfoliants",
                    ProductTwo = "Sensitive Skin",
                    Reason = "Sensitive skin should avoid using many exfoliating products in the same week."
                },
                new ProductConflict
                {
                    ProductOne = "Benzoyl Peroxide",
                    ProductTwo = "Sensitive Skin",
                    Reason = "Benzoyl peroxide may be drying or irritating for sensitive skin."
                },
                new ProductConflict
                {
                    ProductOne = "Retinol",
                    ProductTwo = "Pregnancy",
                    Reason = "Retinol is usually avoided during pregnancy unless approved by a dermatologist."
                },
            };

            context.ProductConflicts.AddRange(conflicts);

            context.SaveChanges();
        }
    }
}