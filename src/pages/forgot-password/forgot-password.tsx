'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './forgot-password.scss';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="forgot-password-page">
        <div className="forgot-password-container">
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h1>Check your email</h1>
            <p>
              We&apos;ve sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="instruction">
              Click the link in the email to reset your password. If you don&apos;t see it, check your spam folder.
            </p>
            <Link href="/login" className="back-to-login">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <div className="forgot-password-form-wrapper">
          {/* Logo */}
          <div className="forgot-password-logo">
            <Image
              src="/Assets/logo/shisha-logo.svg"
              alt="Shisha Logo"
              width={120}
              height={40}
              className="logo-image"
            />
          </div>

          {/* Header */}
          <div className="forgot-password-header">
            <h1 className="forgot-password-title">Forgot your password?</h1>
            <p className="forgot-password-subtitle">
              No worries, we&apos;ll send you reset instructions.
            </p>
          </div>

          {/* Form */}
          <form className="forgot-password-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <div className="input-wrapper">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="Enter your email"
                  required
                />
                <svg className="input-icon" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
            </div>

            <button
              type="submit"
              className={`reset-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <span>Sending...</span>
                </div>
              ) : (
                'Send reset instructions'
              )}
            </button>
          </form>

          {/* Back to Login */}
          <div className="back-to-login-section">
            <Link href="/login" className="back-to-login-link">
              ← Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 