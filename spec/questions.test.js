import React from 'react';
import ReactDOM from 'react-dom';
import mockAxios from 'jest-mock-axios';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import { JSDOM } from 'jsdom';
import Questions from '../client/src/components/questions/Questions.jsx';

/**
 * @jest-environment jsdom
 */

describe('Questions component', () => {

  test('has a main-questions div', () => {
    const wrapper = shallow(<Questions productId={17067} productName={'Camo Onesie'}/>);
    expect(wrapper.find('.main-questions')).toBeDefined();
    expect(wrapper.find('.main-questions').children()).toHaveLength(6);
    //  const addQuestionButton = questions.find('MoreQActive');
  });

  test('has correct title', () => {
    const wrapper = shallow(<Questions productId={17067} productName={'Camo Onesie'}/>);
    expect(wrapper.find('#titleQA')).toBeDefined();
    expect(wrapper.find('#titleQA').text()).toBe('QUESTIONS AND ANSWERS');
  });

  test('has a search bar', () => {
    const wrapper = shallow(<Questions productId={17067} productName={'Camo Onesie'}/>);
    expect(wrapper.find('.search')).toBeDefined();
    expect(wrapper.find('.search form')).toBeDefined();
    expect(wrapper.find('.search').children()).toHaveLength(1);
  });

  test('has a question list', () => {
    const wrapper = shallow(<Questions productId={17067} productName={'Camo Onesie'}/>);
    expect(wrapper.find('.Qlist')).toBeDefined();
  });

  test('has a more answer questions button', () => {
    const wrapper = shallow(<Questions productId={17067} productName={'Camo Onesie'}/>);
    expect(wrapper.find('#MoreQActive')).toBeDefined();
    expect(wrapper.find('#MoreQActive').text()).toBe('MORE ANSWERED QUESTIONS');
  });

  test('has an add questions button', () => {
    const wrapper = shallow(<Questions productId={17067} productName={'Camo Onesie'}/>);
    expect(wrapper.find('#AddQ')).toBeDefined();
  });
});

describe('main q/a page', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  //has correct title
  test('has correct title', () => {

  });
  //has a search bar
  //has a question list
  //has add question button
  //has more added questions button
});

test('add a question', () => {
  //click the add question button
  //check that modal appears
  //
});

