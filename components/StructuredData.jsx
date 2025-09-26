export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://pylearn.vercel.app/#organization",
        name: "PyLearn",
        url: "https://pylearn.vercel.app",
        logo: {
          "@type": "ImageObject",
          url: "https://pylearn.vercel.app/logo.png",
          width: 512,
          height: 512
        },
        description: "Interactive Python learning platform with gamified exercises and real-world projects",
        foundingDate: "2024",
        founder: {
          "@type": "Person",
          name: "PyLearn Team"
        },
        sameAs: [
          "https://twitter.com/pylearn_app",
          "https://github.com/pylearn"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://pylearn.vercel.app/#website",
        url: "https://pylearn.vercel.app",
        name: "PyLearn - Learn Python Programming Online",
        description: "Master Python programming with interactive lessons, quizzes, and hands-on practice",
        publisher: {
          "@id": "https://pylearn.vercel.app/#organization"
        },
        inLanguage: "en-US",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://pylearn.vercel.app/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://pylearn.vercel.app/#webpage",
        url: "https://pylearn.vercel.app",
        name: "Learn Python Programming Online - Interactive Python Course",
        description: "Master Python programming with interactive lessons, quizzes, and hands-on practice. Learn coding step by step with gamified exercises.",
        isPartOf: {
          "@id": "https://pylearn.vercel.app/#website"
        },
        about: {
          "@id": "https://pylearn.vercel.app/#organization"
        },
        datePublished: "2024-01-01",
        dateModified: "2024-12-26",
        inLanguage: "en-US"
      },
      {
        "@type": "Course",
        "@id": "https://pylearn.vercel.app/learn#course",
        name: "Interactive Python Programming Course",
        description: "Comprehensive Python programming course with interactive exercises, quizzes, and real-world projects. Perfect for beginners and experienced developers.",
        provider: {
          "@id": "https://pylearn.vercel.app/#organization"
        },
        url: "https://pylearn.vercel.app/learn",
        courseMode: "online",
        educationalCredentialAwarded: "Certificate of Completion",
        teaches: [
          "Python basics and syntax",
          "Variables and data types",
          "Control structures and loops",
          "Functions and modules",
          "Object-oriented programming",
          "Error handling",
          "File operations",
          "Web development with Python"
        ],
        audience: {
          "@type": "Audience",
          audienceType: "Beginners to Advanced Python learners"
        },
        timeRequired: "PT40H",
        numberOfCredits: 0,
        isAccessibleForFree: true,
        inLanguage: "en-US",
        availableLanguage: "en",
        learningResourceType: "Interactive Course",
        interactivityType: "active",
        typicalAgeRange: "16-99"
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://pylearn.vercel.app/#app",
        name: "PyLearn - Python Learning Platform",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web Browser",
        url: "https://pylearn.vercel.app",
        description: "Interactive Python learning platform with gamified exercises and real-world projects",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD"
        },
        screenshot: "https://pylearn.vercel.app/screenshot.png",
        softwareVersion: "1.0.0",
        datePublished: "2024-01-01",
        author: {
          "@id": "https://pylearn.vercel.app/#organization"
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          ratingCount: "1250",
          bestRating: "5",
          worstRating: "1"
        }
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is PyLearn free to use?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, PyLearn is completely free to use. You can access all our interactive Python lessons, exercises, and quizzes without any cost."
            }
          },
          {
            "@type": "Question", 
            name: "Do I need any prior programming experience?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No prior programming experience is required. Our course is designed for complete beginners and gradually introduces more advanced concepts as you progress."
            }
          },
          {
            "@type": "Question",
            name: "Can I run Python code directly in the browser?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes! Our platform includes an integrated Python interpreter that runs directly in your browser, so you can write and execute Python code without any setup."
            }
          },
          {
            "@type": "Question",
            name: "How long does it take to complete the course?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The course is self-paced and typically takes 40-60 hours to complete, depending on your learning speed and the time you dedicate to practice."
            }
          }
        ]
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}