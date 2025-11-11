import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courseAPI } from '../services/api';
import CourseCard from '../components/CourseCard';
import Loading from '../components/Loading';

export default function Home() {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedCourses();
  }, []);

  const loadFeaturedCourses = async () => {
    try {
      const response = await courseAPI.getAll({ limit: 6 });
      setFeaturedCourses(response.data.courses || []);
    } catch (error) {
      console.error('Failed to load courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { name: 'Development', icon: '💻', count: '450+' },
    { name: 'Business', icon: '📊', count: '380+' },
    { name: 'Design', icon: '🎨', count: '290+' },
    { name: 'Marketing', icon: '📱', count: '320+' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Video Background */}
      <section className="relative h-[85vh] overflow-hidden bg-gray-900">
        {/* Video Background with Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/90"></div>
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="w-full lg:w-2/3 space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Master New Skills with
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                Expert-Led Courses
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
              Join a community of over 15 million learners worldwide. Discover courses taught by industry experts and take your skills to the next level.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/courses"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg shadow-emerald-500/25"
              >
                Explore Courses
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-emerald-400 border-2 border-emerald-400/50 rounded-xl hover:bg-emerald-500/10 transition-all duration-200 backdrop-blur-sm"
              >
                Get Started Free
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {[
                { label: 'Active Students', value: '15M+' },
                { label: 'Total Courses', value: '1.2K+' },
                { label: 'Success Rate', value: '94%' },
                { label: 'Expert Instructors', value: '200+' },
              ].map((stat, index) => (
                <div key={index} className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-emerald-400">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/3 h-2/3 bg-gradient-to-l from-emerald-500/20 to-transparent blur-3xl"></div>
        <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
      </section>

      {/* Popular Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Popular Categories</h2>
            <p className="mt-4 text-lg text-gray-600">Choose from our diverse range of course categories</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to="/courses"
                className="group p-6 bg-gray-50 rounded-2xl hover:bg-gradient-to-br hover:from-emerald-50 hover:to-teal-50 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600 group-hover:text-emerald-600">{category.count} courses</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Courses</h2>
            <p className="mt-4 text-lg text-gray-600">Start your learning journey with our top-rated courses</p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <Loading />
            </div>
          ) : featuredCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses.map((course) => (
                <div key={course._id} className="group">
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              No courses available yet. Check back soon!
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/courses"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 transform hover:-translate-y-1"
            >
              View All Courses
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Our Platform?</h2>
              <div className="space-y-8">
                {[
                  {
                    title: 'Expert Instructors',
                    description: 'Learn from industry professionals with years of experience.',
                    icon: '👨‍🏫',
                  },
                  {
                    title: 'Flexible Learning',
                    description: 'Study at your own pace, anywhere and anytime.',
                    icon: '⏰',
                  },
                  {
                    title: 'Interactive Content',
                    description: 'Engage with hands-on projects and real-world applications.',
                    icon: '💡',
                  },
                  {
                    title: 'Career Support',
                    description: 'Get guidance and support to achieve your career goals.',
                    icon: '🎯',
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-2xl">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/student-learning.jpg"
                  alt="Student learning online"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-tr from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-20 bg-gray-900">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Join thousands of learners who are already advancing their careers with our courses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 transform hover:-translate-y-1"
            >
              Get Started Free
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/courses"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/20 rounded-xl hover:bg-white/10 transition-all duration-200"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}