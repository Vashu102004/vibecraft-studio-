import dotenv from 'dotenv';
dotenv.config();

/**
 * Tool 1: Microsoft Foundry IQ Simulated Agentic Retrieval
 * Exposes a simulated enterprise knowledge graph query for local businesses.
 */
export async function queryFoundryIQKnowledge(args) {
  const { businessName } = args;
  
  // Simulated latency for knowledge graph traversal
  await new Promise(resolve => setTimeout(resolve, 800));

  let brandVoice = "Energetic, festive, welcoming, premium community feel.";
  let safetyGuidelines = "Use clean padding, rich festive typography gradients, and clear call-to-actions. Strictly no offensive content.";
  let regionalVibe = "Tailored for local high-street retail setups.";
  let targetDemographic = "General local shoppers.";

  if (businessName.toLowerCase().includes("parts") || businessName.toLowerCase().includes("auto")) {
    brandVoice = "Trustworthy, heavy-duty, customer-first, locally grounded.";
    safetyGuidelines = "Ensure clear emphasis on genuine parts and durability. High contrast steel/amber accents. Professional tone.";
    regionalVibe = "Perfect for central Indian commercial hubs like Indore or Bhopal.";
    targetDemographic = "Mechanics, vehicle owners, and commercial transport drivers.";
  }

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify({
          status: "success",
          source: "Microsoft Foundry IQ (Simulated)",
          knowledge_graph: {
            brandVoice,
            safetyGuidelines,
            regionalVibe,
            targetDemographic,
            complianceLevel: "Tier 1 - Strict Business Mode"
          }
        }, null, 2),
      },
    ],
  };
}

/**
 * Tool 2: Generate Grounded Copy based on Foundry IQ Context
 */
export async function generateGroundedCopy(args) {
  const { businessName, eventType, brandVoice } = args;

  const isFestive = eventType.toLowerCase().includes("diwali") || eventType.toLowerCase().includes("festival");
  
  let customHinglishCaption = "";
  if (isFestive) {
    customHinglishCaption = `Shubh ${eventType} Alert!\n\nApne business ko dijiye ek naya bharosa! ${businessName} lekar aaya hai special offers aap sabhi ke liye. \n\n100% Genuine & Reliable Quality, guided by our principle: "${brandVoice}". \n\nAaj hi visit karein!`;
  } else {
    customHinglishCaption = `Mega Celebration Deal!\n\nGreat news from ${businessName}! We are launching our mega ${eventType} just for you. Driven by a ${brandVoice.toLowerCase()} promise.\n\nLimited Time Offer! Don't miss out.`;
  }

  return {
    content: [
      {
        type: "text",
        text: customHinglishCaption,
      },
    ],
  };
}

/**
 * Tool 3: Render Final Creative Canvas
 */
export async function renderCssCanvas(args) {
  const { businessName, eventType, primaryColor, regionalVibe } = args;
  
  const eventHeaderColor = primaryColor || (eventType.toLowerCase().includes("diwali") ? "#ff9800" : "#d32f2f");
  
  const initials = businessName.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() || "VC";

  const htmlTemplate = `
<div style="font-family: 'Inter', system-ui, sans-serif; padding: 40px; background: linear-gradient(145deg, #ffffff, #f3f4f6); border-radius: 24px; text-align: center; max-width: 480px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); border: 1px solid ${eventHeaderColor}40; margin: auto; position: relative; overflow: hidden;">
  <div style="position: absolute; top: 0; left: 0; right: 0; height: 6px; background: linear-gradient(90deg, ${eventHeaderColor}, #111827);"></div>
  <div style="width: 60px; height: 60px; background: ${eventHeaderColor}15; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px auto; border: 2px solid ${eventHeaderColor}30;">
    <span style="color: ${eventHeaderColor}; font-weight: 900; font-size: 24px;">${initials}</span>
  </div>
  <h2 style="color: #111827; font-size: 28px; margin-bottom: 8px; font-weight: 900; letter-spacing: -0.5px;">${businessName}</h2>
  <span style="font-size: 12px; text-transform: uppercase; color: ${eventHeaderColor}; font-weight: 700; letter-spacing: 3px; display: block; margin-bottom: 30px;">${regionalVibe || "Premium Commercial Hub"}</span>
  
  <div style="background: #ffffff; padding: 35px 25px; border-radius: 20px; margin-bottom: 30px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); border: 1px solid #f3f4f6;">
    <h3 style="color: ${eventHeaderColor}; font-size: 22px; margin: 0 0 15px 0; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">${eventType}</h3>
    <p style="color: #4b5563; font-size: 15px; line-height: 1.7; margin: 0; font-weight: 500;">Experience premium tailored solution and exclusive discounts on our trusted catalog items.</p>
  </div>
  
  <button style="background: linear-gradient(135deg, ${eventHeaderColor}, #111827); color: #ffffff; padding: 16px 40px; font-size: 15px; font-weight: 800; border-radius: 50px; text-transform: uppercase; border: none; cursor: pointer; box-shadow: 0 10px 20px ${eventHeaderColor}40; letter-spacing: 1px;">Claim Offer Now</button>
</div>`;

  return {
    content: [
      {
        type: "text",
        text: htmlTemplate,
      },
    ],
  };
}
