import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import cliplist from "../images/cliplist.png";
import clipshapes from "../images/clipshapes.png";

const LandingPage = props => {
  const nav = () => {
    return (
      <nav class="navbar navbar-guest">
        <div class="navbar-brand">
          <strong class="navbar-item navbar-item-logo">HabitTracker</strong>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
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
      <section class="hero has-background-white">
        <div class="hero-body">
          <div class="container">
            <div class="columns">
              <div class="column is-6">
                <h1 class="title is-1 ht-title has-text-left">
                  Finally, habits that <em>actually</em> work.
                </h1>
                <h2 class="subtitle ht-subtitle has-text-left">
                  Stick to your habits and resolutions using technology built on
                  psychological principles while keeping your data 100% private.
                </h2>
                <Link to="/signup" class="button is-medium is-primary">
                  <strong>Get started for free</strong>
                </Link>
                <span class="help">
                  Add as many habits as you want, it's always free.
                </span>
              </div>
              <div class="column is-6">
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
      <section class="hero is-secondary is-bold">
        <div class="hero-body">
          <div class="container">
            <div class="columns">
              <div class="column is-6">
                <img alt="woman with shapes" src={clipshapes} />
              </div>
              <div class="column is-5">
                <p class="ht-prop-title">
                  Have you ever failed to stick to your habits or resolutions?
                </p>
                <p class="ht-prop-subtitle">
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
      <section class="hero has-background-white">
        <div class="hero-body">
          <h1 class="title how-it-works-title">How it works</h1>
          <div class="container">
            <div class="columns is-centered">
              <div class="column has-text-centered is-4">
                <i class="far fa-check-square fa-7x"></i>
                <p class="ht-prop-subtitle">
                  Add all of the habits you want to make or break and check them
                  off by day as you complete them.
                </p>
              </div>
              <div class="column has-text-centered is-4">
                <i class="far fa-clock fa-7x"></i>
                <p class="ht-prop-subtitle">
                  Watch your progress with the streaks feature that shows you
                  how many days in a row you've completed your habit.
                </p>
              </div>
              <div class="column has-text-centered is-4">
                <i class="far fa-bell fa-7x"></i>
                <p class="ht-prop-subtitle">
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
      <section class="hero is-secondary is-bold">
        <div class="hero-body">
          <div class="container has-text-centered">
            <p class="footer-title">Try HabitTracker today for free</p>
            <Link to="/signup" class="button is-medium is-primary">
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

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(LandingPage);
