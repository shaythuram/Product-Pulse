"use server"

import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCT9kRNim2xHA46xvFS97nydYusXmJr4lY",
  authDomain: "tuneaiconsole.firebaseapp.com",
  projectId: "tuneaiconsole",
  storageBucket: "tuneaiconsole.firebasestorage.app",
  messagingSenderId: "829691341940",
  appId: "1:829691341940:web:91241b7553b9c086aeb521",
  measurementId: "G-YZT3X60E2H",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

interface FormData {
  name: string
  email: string
  businessType: "dropshipper" | "branded" | ""
  hasShopify: boolean
  shopifyUrl: string
  industry: string
  focus: string[]
}

export async function submitFormToNotion(formData: FormData) {
  try {
    // Create a document in the "productpulse_submissions" collection
    const docRef = await addDoc(collection(db, "productpulse_submissions"), {
      name: formData.name,
      email: formData.email,
      businessType: formData.businessType,
      hasOnlineStore: formData.hasShopify,
      storeUrl: formData.shopifyUrl || null,
      industry: formData.industry,
      focus: formData.focus,
      submissionDate: new Date().toISOString(),
      status: "New",
      timestamp: Date.now(),
    })

    return { success: true, id: docRef.id }
  } catch (error) {
    console.error("Error submitting to Firebase:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to save data",
    }
  }
}
