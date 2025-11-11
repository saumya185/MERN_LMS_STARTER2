import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const {
    _id,
    title,
    subtitle,
    price,
    discountPrice,
    thumbnail,
    instructor,
    averageRating,
    totalRatings,
    enrollmentCount,
    level,
    totalDuration,
  } = course;

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const formatPrice = (price) => {
    return price === 0 ? 'Free' : `₹${price}`;
  };

  return (
    <Link to={`/courses/${_id}`} className="group block">
      <div className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-100 transform hover:-translate-y-1">
        {/* Thumbnail */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={thumbnail || 'https://via.placeholder.com/400x240?text=Course+Image'}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Discount Badge */}
          {discountPrice && discountPrice < price && (
            <div className="absolute top-3 left-3 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              {Math.round(((price - discountPrice) / price) * 100)}% OFF
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors duration-200">
              {title}
            </h3>
            {subtitle && (
              <p className="text-sm text-gray-600 line-clamp-2 mt-2 leading-relaxed">{subtitle}</p>
            )}
          </div>

          {/* Instructor */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className="text-sm text-gray-700 font-medium">
              {instructor?.name || 'Expert Instructor'}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center bg-emerald-50 rounded-lg px-3 py-1">
              <span className="text-sm font-bold text-emerald-600 mr-1">
                {averageRating > 0 ? averageRating.toFixed(1) : '4.5'}
              </span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-emerald-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <span className="text-sm text-emerald-600 ml-1 font-medium">
                ({totalRatings || '150'})
              </span>
            </div>
          </div>

          {/* Duration and Level */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-1 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">{formatDuration(totalDuration)}</span>
            </div>
            <span className="text-sm px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full font-medium">
              {level || 'All Levels'}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between border-t pt-4">
            <div>
              {discountPrice && discountPrice < price ? (
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-emerald-600">
                    {formatPrice(discountPrice)}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(price)}
                  </span>
                </div>
              ) : (
                <span className={`text-xl font-bold ${price === 0 ? 'text-emerald-600' : 'text-gray-900'}`}>
                  {formatPrice(price)}
                </span>
              )}
            </div>
            
            <button className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg font-medium text-sm hover:bg-emerald-100 transition-colors duration-200">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
