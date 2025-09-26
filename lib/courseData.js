// Course data structure for the Python learning app
export const courses = [
  {
    id: 'python-basics',
    title: 'Python Fundamentals',
    description: 'Start your Python journey with the basics',
    level: 'beginner',
    icon: '🐍',
    color: 'from-green-400 to-blue-500',
    estimatedTime: '2-3 hours',
    totalLessons: 12,
    units: [
      {
        id: 'getting-started',
        title: 'Getting Started with Python',
        description: 'Learn the fundamentals of Python programming',
        lessons: [
          {
            id: 'variables-numbers',
            title: 'Variables and Numbers',
            description: 'Learn how to store data in variables and work with numbers',
            duration: 15,
            type: 'lesson',
            difficulty: 'beginner',
            completed: false,
            locked: false,
            content: [
              {
                type: 'exercise',
                id: 'first-variable',
                instruction: 'Create a variable called "age" and set it to your age. Then print it.',
                startingCode: '# Create a variable called age\n# Set it to your age\n# Print the variable',
                solution: 'age = 25\nprint(age)',
                hints: [
                  'Use the = operator to assign a value to a variable',
                  'Variable names should be lowercase with underscores',
                  'Use print() to display the value'
                ],
                successMessage: 'Great! You created your first variable!',
                errorMessage: 'Try again. Remember to create the variable and print it.'
              },
              {
                type: 'exercise',
                id: 'math-operations',
                instruction: 'Calculate the sum of 15 and 27, store it in a variable called "total", and print it.',
                startingCode: '# Calculate 15 + 27\n# Store in variable called total\n# Print the result',
                solution: 'total = 15 + 27\nprint(total)',
                hints: [
                  'Use the + operator for addition',
                  'Store the result in a variable',
                  'Print the variable to see the result'
                ],
                successMessage: 'Perfect! You can do math with Python!',
                errorMessage: 'Check your calculation and variable assignment.'
              },
              {
                type: 'quiz',
                id: 'variables-quiz',
                title: 'Variables Quiz',
                timeLimit: 120,
                questions: [
                  {
                    id: 'var-syntax',
                    type: 'multiple-choice',
                    question: 'Which is the correct way to create a variable in Python?',
                    options: [
                      'var name = "John"',
                      'name = "John"',
                      'variable name = "John"',
                      'string name = "John"'
                    ],
                    correctAnswer: 1,
                    explanation: 'Python uses simple assignment with = operator, no keywords needed.',
                    successMessage: 'Correct! Python variables are created with simple assignment.',
                    errorMessage: 'Python doesn\'t need var or type keywords like other languages.'
                  },
                  {
                    id: 'number-types',
                    type: 'true-false',
                    question: 'In Python, 5 and 5.0 are the same type of number.',
                    correctAnswer: false,
                    explanation: '5 is an integer (int) while 5.0 is a float (floating-point number).',
                    successMessage: 'Right! 5 is int, 5.0 is float - different types.',
                    errorMessage: 'Actually, 5 is an integer and 5.0 is a float - different types.'
                  }
                ]
              }
            ]
          },
          {
            id: 'strings-text',
            title: 'Strings and Text',
            description: 'Master text manipulation and string operations',
            duration: 20,
            type: 'lesson',
            difficulty: 'beginner',
            completed: false,
            locked: false,
            content: [
              {
                type: 'exercise',
                id: 'first-string',
                instruction: 'Create a variable called "name" with your name as a string, then print a greeting.',
                startingCode: '# Create a string variable with your name\n# Print a greeting message',
                solution: 'name = "Alice"\nprint("Hello, " + name + "!")',
                hints: [
                  'Strings are enclosed in quotes',
                  'Use + to concatenate strings',
                  'Don\'t forget the quotes around text'
                ],
                successMessage: 'Excellent! You can work with strings!',
                errorMessage: 'Remember to use quotes for strings and + for concatenation.'
              },
              {
                type: 'exercise',
                id: 'string-methods',
                instruction: 'Create a string "python programming" and convert it to uppercase, then print it.',
                startingCode: '# Create the string\n# Convert to uppercase\n# Print the result',
                solution: 'text = "python programming"\nuppercase_text = text.upper()\nprint(uppercase_text)',
                hints: [
                  'Use the .upper() method on strings',
                  'Store the result in a new variable',
                  'String methods don\'t modify the original string'
                ],
                successMessage: 'Great! You used a string method!',
                errorMessage: 'Try using the .upper() method on your string.'
              },
              {
                type: 'quiz',
                id: 'strings-quiz',
                title: 'Strings Quiz',
                timeLimit: 90,
                questions: [
                  {
                    id: 'string-quotes',
                    type: 'multiple-choice',
                    question: 'Which of these are valid ways to create a string in Python?',
                    options: [
                      'Only "double quotes"',
                      'Only \'single quotes\'',
                      'Both "double" and \'single\' quotes',
                      'Only `backticks`'
                    ],
                    correctAnswer: 2,
                    explanation: 'Python accepts both single and double quotes for strings.',
                    successMessage: 'Correct! Python is flexible with quote types.',
                    errorMessage: 'Python accepts both single and double quotes for strings.'
                  }
                ]
              }
            ]
          },
          {
            id: 'basics-quiz',
            title: 'Python Basics Quiz',
            description: 'Test your understanding of Python fundamentals',
            duration: 10,
            type: 'quiz',
            difficulty: 'beginner',
            completed: false,
            locked: false,
            content: [
              {
                type: 'quiz',
                id: 'comprehensive-basics',
                title: 'Python Basics Final Quiz',
                timeLimit: 300,
                questions: [
                  {
                    id: 'debugging-exercise',
                    type: 'debugging',
                    question: 'Fix the bugs in this code that should print "Hello World":',
                    buggyCode: 'message = Hello World\nprint(message',
                    fixedCode: 'message = "Hello World"\nprint(message)',
                    solution: 'message = "Hello World"\nprint(message)',
                    placeholder: 'Fix the code here...',
                    explanation: 'Strings need quotes and print() needs closing parenthesis.',
                    successMessage: 'Perfect debugging! You fixed both issues.',
                    errorMessage: 'Check the string quotes and parentheses.'
                  },
                  {
                    id: 'code-completion',
                    type: 'code-completion',
                    question: 'Complete this code to calculate and print the area of a rectangle:',
                    code: 'length = 10\nwidth = 5\n# Calculate area and print it',
                    solution: 'area = length * width\nprint(area)',
                    placeholder: 'Complete the calculation...',
                    explanation: 'Area = length × width, then print the result.',
                    successMessage: 'Excellent! You calculated the area correctly.',
                    errorMessage: 'Remember: area = length * width, then print it.'
                  },
                  {
                    id: 'variable-naming',
                    type: 'multiple-choice',
                    question: 'Which is the best variable name for storing a person\'s email address?',
                    options: [
                      'e',
                      'email_address',
                      'EmailAddress',
                      '1email'
                    ],
                    correctAnswer: 1,
                    explanation: 'Python follows snake_case convention for variables. Be descriptive but concise.',
                    successMessage: 'Right! snake_case is Python\'s style.',
                    errorMessage: 'Python prefers snake_case: lowercase with underscores.'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'control-structures',
    title: 'Control Structures',
    description: 'Learn about conditions, loops, and program flow',
    level: 'beginner',
    icon: '🔄',
    color: 'from-purple-400 to-pink-500',
    estimatedTime: '3-4 hours',
    totalLessons: 18,
    units: [
      {
        id: 'conditions',
        title: 'If Statements and Conditions',
        description: 'Make decisions in your code with if statements',
        lessons: [
          {
            id: 'if-statements',
            title: 'If Statements',
            description: 'Learn to make decisions in your code',
            duration: 25,
            type: 'lesson',
            difficulty: 'beginner',
            completed: false,
            locked: true,
            content: [
              {
                type: 'exercise',
                id: 'first-if',
                instruction: 'Write an if statement to check if a number is positive.',
                startingCode: 'number = 5\n# Write an if statement to check if number is positive\n# Print "Positive" if it is',
                solution: 'number = 5\nif number > 0:\n    print("Positive")',
                hints: [
                  'Use the > operator to compare numbers',
                  'Don\'t forget the colon after the condition',
                  'Indent the code inside the if block'
                ],
                successMessage: 'Great! You wrote your first if statement!',
                errorMessage: 'Remember: if condition: (with colon and indentation)'
              }
            ]
          }
        ]
      }
    ]
  }
]

// Helper functions
export function getCourse(courseId) {
  return courses.find(course => course.id === courseId)
}

export function getUnit(courseId, unitId) {
  const course = getCourse(courseId)
  return course?.units.find(unit => unit.id === unitId)
}

export function getLesson(courseId, unitId, lessonId) {
  const unit = getUnit(courseId, unitId)
  return unit?.lessons.find(lesson => lesson.id === lessonId)
}

export function getCourseProgress(userId, courseId) {
  // This would typically fetch from Firebase
  // For now, return mock data
  return {
    courseId,
    completedLessons: 0,
    totalLessons: 12,
    currentUnit: 'getting-started',
    currentLesson: 'variables-numbers',
    xp: 0,
    streak: 0,
    lastAccessed: new Date().toISOString()
  }
}

export function getUserProgress(userId, courseId, unitId, lessonId) {
  // This would typically fetch from Firebase
  // For now, return mock data
  return {
    completed: false,
    completedSteps: [],
    currentStep: 0,
    totalXP: 0,
    attempts: 0,
    bestScore: 0,
    timeSpent: 0,
    lastAccessed: new Date().toISOString()
  }
}

export async function updateLessonProgress(userId, courseId, unitId, lessonId, progressData) {
  // This would typically update Firebase
  console.log('Updating lesson progress:', { userId, courseId, unitId, lessonId, progressData })
  
  // Mock implementation
  return {
    success: true,
    data: progressData
  }
}

export function getNextLesson(courseId, unitId, lessonId) {
  const course = getCourse(courseId)
  if (!course) return null

  for (const unit of course.units) {
    if (unit.id === unitId) {
      const lessonIndex = unit.lessons.findIndex(lesson => lesson.id === lessonId)
      if (lessonIndex < unit.lessons.length - 1) {
        // Next lesson in same unit
        return {
          courseId,
          unitId: unit.id,
          lessonId: unit.lessons[lessonIndex + 1].id
        }
      } else {
        // First lesson in next unit
        const unitIndex = course.units.findIndex(u => u.id === unitId)
        if (unitIndex < course.units.length - 1) {
          const nextUnit = course.units[unitIndex + 1]
          return {
            courseId,
            unitId: nextUnit.id,
            lessonId: nextUnit.lessons[0].id
          }
        }
      }
    }
  }
  
  return null // No more lessons
}