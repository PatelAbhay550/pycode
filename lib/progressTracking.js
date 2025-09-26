import { db } from './firebase'
import { doc, setDoc, getDoc, updateDoc, increment, arrayUnion, serverTimestamp } from 'firebase/firestore'

// User Progress Management
export async function initializeUserProgress(userId, userEmail, displayName) {
  try {
    const userRef = doc(db, 'users', userId)
    const userDoc = await getDoc(userRef)
    
    if (!userDoc.exists()) {
      // Initialize new user
      await setDoc(userRef, {
        email: userEmail,
        displayName: displayName || '',
        totalXP: 0,
        currentStreak: 0,
        longestStreak: 0,
        lessonsCompleted: 0,
        quizzesCompleted: 0,
        totalTimeSpent: 0,
        achievements: [],
        lastLoginDate: new Date().toDateString(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
    } else {
      // Update last login and check streak
      const userData = userDoc.data()
      const today = new Date().toDateString()
      const lastLogin = userData.lastLoginDate
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayString = yesterday.toDateString()
      
      let newStreak = userData.currentStreak || 0
      
      if (lastLogin === yesterdayString) {
        // Consecutive day - increment streak
        newStreak += 1
      } else if (lastLogin !== today) {
        // Not consecutive - reset streak
        newStreak = 1
      }
      
      await updateDoc(userRef, {
        lastLoginDate: today,
        currentStreak: newStreak,
        longestStreak: Math.max(userData.longestStreak || 0, newStreak),
        updatedAt: serverTimestamp()
      })
    }
    
    return true
  } catch (error) {
    console.error('Error initializing user progress:', error)
    return false
  }
}

// Lesson Progress Management
export async function updateLessonProgress(userId, courseId, unitId, lessonId, progressData) {
  try {
    const userRef = doc(db, 'users', userId)
    const progressRef = doc(db, 'progress', `${userId}_${courseId}_${unitId}_${lessonId}`)
    
    // Update lesson progress
    await setDoc(progressRef, {
      userId,
      courseId,
      unitId,
      lessonId,
      completed: progressData.completed || false,
      completedSteps: progressData.completedSteps || [],
      currentStep: progressData.currentStep || 0,
      score: progressData.score || 0,
      attempts: progressData.attempts || 1,
      timeSpent: progressData.timeSpent || 0,
      xpEarned: progressData.totalXP || 0,
      completedAt: progressData.completed ? serverTimestamp() : null,
      lastAccessed: serverTimestamp()
    })
    
    // Update user stats if lesson completed
    if (progressData.completed) {
      await updateDoc(userRef, {
        totalXP: increment(progressData.totalXP || 0),
        lessonsCompleted: increment(1),
        totalTimeSpent: increment(progressData.timeSpent || 0),
        updatedAt: serverTimestamp()
      })
      
      // Check for achievements
      await checkAchievements(userId)
    }
    
    return true
  } catch (error) {
    console.error('Error updating lesson progress:', error)
    return false
  }
}

// Quiz Progress Management
export async function updateQuizProgress(userId, quizId, quizData) {
  try {
    const userRef = doc(db, 'users', userId)
    const quizRef = doc(db, 'quizResults', `${userId}_${quizId}_${Date.now()}`)
    
    // Save quiz result
    await setDoc(quizRef, {
      userId,
      quizId,
      score: quizData.score,
      totalQuestions: quizData.totalQuestions,
      correctAnswers: quizData.correctAnswers,
      answers: quizData.answers,
      timeSpent: quizData.totalTime,
      completedAt: serverTimestamp()
    })
    
    // Update user stats
    const xpEarned = Math.round(quizData.score / 10) // 1 XP per 10% score
    await updateDoc(userRef, {
      totalXP: increment(xpEarned),
      quizzesCompleted: increment(1),
      totalTimeSpent: increment(Math.round(quizData.totalTime / 1000 / 60)), // Convert to minutes
      updatedAt: serverTimestamp()
    })
    
    // Check for achievements
    await checkAchievements(userId)
    
    return true
  } catch (error) {
    console.error('Error updating quiz progress:', error)
    return false
  }
}

// Achievement System
export async function checkAchievements(userId) {
  try {
    const userRef = doc(db, 'users', userId)
    const userDoc = await getDoc(userRef)
    
    if (!userDoc.exists()) return
    
    const userData = userDoc.data()
    const currentAchievements = userData.achievements || []
    const newAchievements = []
    
    // Define achievements
    const achievements = [
      {
        id: 'first_lesson',
        condition: () => userData.lessonsCompleted >= 1,
        title: 'First Steps',
        description: 'Complete your first lesson',
        xpReward: 50
      },
      {
        id: 'streak_7',
        condition: () => userData.longestStreak >= 7,
        title: 'Week Warrior',
        description: '7-day learning streak',
        xpReward: 100
      },
      {
        id: 'quiz_master',
        condition: () => userData.quizzesCompleted >= 10,
        title: 'Quiz Master',
        description: 'Complete 10 quizzes',
        xpReward: 150
      },
      {
        id: 'xp_1000',
        condition: () => userData.totalXP >= 1000,
        title: 'XP Champion',
        description: 'Earn 1000 XP',
        xpReward: 200
      },
      {
        id: 'lesson_streak_5',
        condition: () => userData.lessonsCompleted >= 5,
        title: 'Learning Machine',
        description: 'Complete 5 lessons',
        xpReward: 75
      }
    ]
    
    // Check each achievement
    for (const achievement of achievements) {
      if (!currentAchievements.includes(achievement.id) && achievement.condition()) {
        newAchievements.push(achievement.id)
      }
    }
    
    // Update user with new achievements
    if (newAchievements.length > 0) {
      const totalXPReward = newAchievements.reduce((total, achievementId) => {
        const achievement = achievements.find(a => a.id === achievementId)
        return total + (achievement?.xpReward || 0)
      }, 0)
      
      await updateDoc(userRef, {
        achievements: arrayUnion(...newAchievements),
        totalXP: increment(totalXPReward),
        updatedAt: serverTimestamp()
      })
      
      return newAchievements.map(id => achievements.find(a => a.id === id))
    }
    
    return []
  } catch (error) {
    console.error('Error checking achievements:', error)
    return []
  }
}

// Get User Progress
export async function getUserProgress(userId, courseId = null, unitId = null, lessonId = null) {
  try {
    if (courseId && unitId && lessonId) {
      // Get specific lesson progress
      const progressRef = doc(db, 'progress', `${userId}_${courseId}_${unitId}_${lessonId}`)
      const progressDoc = await getDoc(progressRef)
      return progressDoc.exists() ? progressDoc.data() : null
    } else {
      // Get all user progress
      const userRef = doc(db, 'users', userId)
      const userDoc = await getDoc(userRef)
      return userDoc.exists() ? userDoc.data() : null
    }
  } catch (error) {
    console.error('Error getting user progress:', error)
    return null
  }
}

// Get Course Progress
export async function getCourseProgress(userId, courseId) {
  try {
    // This would typically query all lessons in a course
    // For now, return mock data
    const userRef = doc(db, 'users', userId)
    const userDoc = await getDoc(userRef)
    
    if (!userDoc.exists()) return null
    
    const userData = userDoc.data()
    
    return {
      courseId,
      completedLessons: userData.lessonsCompleted || 0,
      totalLessons: 12, // This should be calculated from course data
      currentUnit: 'getting-started',
      currentLesson: 'variables-numbers',
      xp: userData.totalXP || 0,
      streak: userData.currentStreak || 0,
      lastAccessed: userData.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString()
    }
  } catch (error) {
    console.error('Error getting course progress:', error)
    return null
  }
}

// Leaderboard System
export async function getLeaderboard(limit = 10) {
  try {
    // This would typically use a Firestore query with ordering
    // For now, return mock data
    return [
      { id: '1', displayName: 'CodeMaster', totalXP: 2500, streak: 15 },
      { id: '2', displayName: 'PythonPro', totalXP: 2200, streak: 12 },
      { id: '3', displayName: 'LearningNinja', totalXP: 1950, streak: 8 },
      { id: '4', displayName: 'DataWizard', totalXP: 1800, streak: 10 },
      { id: '5', displayName: 'AlgoExpert', totalXP: 1650, streak: 6 }
    ]
  } catch (error) {
    console.error('Error getting leaderboard:', error)
    return []
  }
}

// Analytics
export async function getUserAnalytics(userId) {
  try {
    const userRef = doc(db, 'users', userId)
    const userDoc = await getDoc(userRef)
    
    if (!userDoc.exists()) return null
    
    const userData = userDoc.data()
    
    // Calculate learning velocity (lessons per week)
    const createdAt = userData.createdAt?.toDate?.() || new Date()
    const daysSinceStart = Math.max(1, Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24)))
    const lessonsPerWeek = (userData.lessonsCompleted || 0) / (daysSinceStart / 7)
    
    return {
      totalXP: userData.totalXP || 0,
      lessonsCompleted: userData.lessonsCompleted || 0,
      quizzesCompleted: userData.quizzesCompleted || 0,
      totalTimeSpent: userData.totalTimeSpent || 0,
      currentStreak: userData.currentStreak || 0,
      longestStreak: userData.longestStreak || 0,
      lessonsPerWeek: Math.round(lessonsPerWeek * 10) / 10,
      averageTimePerLesson: userData.lessonsCompleted > 0 
        ? Math.round(userData.totalTimeSpent / userData.lessonsCompleted) 
        : 0,
      achievements: userData.achievements || [],
      joinDate: createdAt.toISOString()
    }
  } catch (error) {
    console.error('Error getting user analytics:', error)
    return null
  }
}