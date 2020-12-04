import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import cliplist from "../images/cliplist.png";
import clipshapes from "../images/clipshapes.png";
import { Username } from "../models/user";
import { State } from "../store/types";

interface LandingPageProps {
  currentUser: Username | null;
}

const LandingPage: React.FC<LandingPageProps> = (props) => {
  const nav = () => {
    return (
      <nav className="navbar navbar-guest">
        <div className="navbar-brand">
          <strong className="navbar-item navbar-item-logo">HabitTracker</strong>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <Link to="/login">
              <strong>Sign In</strong>
            </Link>
          </div>
        </div>
      </nav>
    );
  };

  const hero = () => {
    return (
      <section className="hero has-background-white">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column is-6">
                <h1 className="title is-1 ht-title has-text-left">
                  Finally, habits that <em>actually</em> work.
                </h1>
                <h2 className="subtitle ht-subtitle has-text-left">
                  Stick to your habits and resolutions using technology built on
                  psychological principles while keeping your data 100% private.
                </h2>
                <Link to="/signup" className="button is-medium is-primary">
                  <strong>Get started for free</strong>
                </Link>
                <span className="help">
                  Add as many habits as you want, it's always free.
                </span>
              </div>
              <div className="column is-6">
                <img alt="Woman with empty clipboard" src={cliplist} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const heroPrimary = () => {
    return (
      <section className="hero is-secondary is-bold">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column is-6">
                <img alt="woman with shapes" src={clipshapes} />
              </div>
              <div className="column is-5">
                <p className="ht-prop-title">
                  Have you ever failed to stick to your habits or resolutions?
                </p>
                <p className="ht-prop-subtitle">
                  HabitTracker helps you succeed in your goals with
                  tried-and-true psychological principles. Whether you need to
                  create a new good habit or break a bad old one, HabitTracker
                  can help.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const howItWorks = () => {
    return (
      <section className="hero has-background-white">
        <div className="hero-body">
          <h1 className="title how-it-works-title">How it works</h1>
          <div className="container">
            <div className="columns is-centered">
              <div className="column has-text-centered is-4">
                <i className="far fa-check-square fa-5x"></i>
                <p className="ht-prop-subtitle">
                  Add all of the habits you want to make or break and check them
                  off by day as you complete them.
                </p>
              </div>
              <div className="column has-text-centered is-4">
                <i className="far fa-clock fa-5x"></i>
                <p className="ht-prop-subtitle">
                  Watch your progress with the streaks feature that shows you
                  how many days in a row you've completed your habit.
                </p>
              </div>
              <div className="column has-text-centered is-4">
                <i className="far fa-bell fa-5x"></i>
                <p className="ht-prop-subtitle">
                  Stay on track with an accountability partner who will be
                  alerted via email if you miss a habit three days in a row.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const footer = () => {
    return (
      <section className="hero is-secondary is-bold">
        <div className="hero-body">
          <div className="container has-text-centered">
            <p className="footer-title">Try HabitTracker today for free</p>
            <Link to="/signup" className="button is-medium is-primary">
              <strong>Get started</strong>
            </Link>
          </div>
        </div>
      </section>
    );
  };

  const renderLanding = () => {
    return (
      <>
        {nav()}
        {hero()}
        {heroPrimary()}
        {howItWorks()}
        {footer()}
      </>
    );
  };

  return props.currentUser === null ? (
    renderLanding()
  ) : (
    <Redirect to={{ pathname: "/home" }} />
  );
};

const mapState = (state: State) => {
  return {
    currentUser: state.currentUser,
  };
};

export default connect(mapState)(LandingPage);
