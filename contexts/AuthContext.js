'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '../lib/firebase'
import { initializeUserProgress } from '../lib/progressTracking'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  // Sign up with email and password
  const signup = async (email, password, displayName) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    
    // Update display name
    await updateProfile(user, { displayName })
    
    // Create user profile in Firestore
    await createUserProfile(user, { displayName })
    
    // Initialize user progress
    await initializeUserProgress(user.uid, user.email, displayName)
    
    return user
  }

  // Sign in with email and password
  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  // Sign in with Google
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    
    // Create or update user profile in Firestore
    await createUserProfile(result.user)
    
    // Initialize user progress
    await initializeUserProgress(result.user.uid, result.user.email, result.user.displayName)
    
    return result.user
  }

  // Sign out
  const logout = () => {
    return signOut(auth)
  }

  // Create user profile in Firestore
  const createUserProfile = async (user, additionalData = {}) => {
    if (!user) return
    
    const userRef = doc(db, 'users', user.uid)
    const userDoc = await getDoc(userRef)
    
    if (!userDoc.exists()) {
      const { displayName, email, photoURL } = user
      const createdAt = new Date()
      
      const profileData = {
        displayName: displayName || additionalData.displayName || 'Anonymous',
        email,
        photoURL: photoURL || null,
        createdAt,
        updatedAt: createdAt,
        // Learning progress
        currentStreak: 0,
        longestStreak: 0,
        totalXP: 0,
        level: 1,
        completedLessons: [],
        quizScores: {},
        badges: [],
        lastActivity: createdAt,
        // User preferences
        preferences: {
          notifications: true,
          theme: 'system',
          language: 'en'
        },
        ...additionalData
      }
      
      try {
        await setDoc(userRef, profileData)
        setUserProfile(profileData)
      } catch (error) {
        console.error('Error creating user profile:', error)
      }
    } else {
      setUserProfile(userDoc.data())
    }
  }

  // Fetch user profile
  const fetchUserProfile = async (uid) => {
    if (!uid) return null
    
    try {
      const userRef = doc(db, 'users', uid)
      const userDoc = await getDoc(userRef)
      
      if (userDoc.exists()) {
        const profile = userDoc.data()
        setUserProfile(profile)
        return profile
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
    
    return null
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      
      if (user) {
        await fetchUserProfile(user.uid)
      } else {
        setUserProfile(null)
      }
      
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    user,
    userProfile,
    loading,
    signup,
    signin,
    signInWithGoogle,
    logout,
    createUserProfile,
    fetchUserProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}