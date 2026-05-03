'use client';
import React, { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  /** Custom fallback UI rendered when an error is caught. */
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Catches rendering errors in the component tree and displays a fallback UI.
 * Errors are logged to the console for diagnostics.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[ErrorBoundary]', error.message, info.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div role="alert" aria-live="assertive" style={{ padding: '1rem', textAlign: 'center' }}>
            <p>Something went wrong. Please refresh the page.</p>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
