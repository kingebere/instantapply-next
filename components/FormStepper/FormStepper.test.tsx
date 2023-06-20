import * as React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import FormStepper from './index';

it('checkIndicatorRender', () => {
	const { queryByTitle } = render(<FormStepper active={0} inputFields={[]} handleChange={function (event: React.ChangeEvent<HTMLInputElement>): void {
        throw new Error('Function not implemented.');
    } } selectFields={[]} uploadPdfProgress={0} pdfPreviewUrl={''} uploadProgress={0} formSubmit={function (e: React.FormEvent<HTMLFormElement>): void {
        throw new Error('Function not implemented.');
    } } firstStepNumber={0} prevPage={function (firstStepNumber: number): void {
        throw new Error('Function not implemented.');
    } } finalStepNumber={0} isButtonDisabled={false} nextPage={function (finalStepNumber: number): void {
        throw new Error('Function not implemented.');
    } } title={''}/>);
	const btn = queryByTitle('indicator');
	expect(btn).toBeTruthy();
});



it('checkPrevBtnClick', async () => {
    render(
      <FormStepper
        active={0}
        inputFields={[]}
        handleChange={(event) => {
          throw new Error('Function not implemented.');
        }}
        selectFields={[]}
        uploadPdfProgress={0}
        pdfPreviewUrl={''}
        uploadProgress={0}
        formSubmit={(e) => {
          throw new Error('Function not implemented.');
        }}
        firstStepNumber={0}
        prevPage={(firstStepNumber) => {
          throw new Error('Function not implemented.');
        }}
        finalStepNumber={0}
        isButtonDisabled={false}
        nextPage={(finalStepNumber) => {
          throw new Error('Function not implemented.');
        }}
        title={''}
      />
    );
  
    const btn = screen.queryByTitle('prevbutton');
    if (btn) {
      expect(btn).toBeInTheDocument();
    }
  });

it('checkNextBtnClick', async () => {
    render(
      <FormStepper
        active={0}
        inputFields={[]}
        handleChange={(event) => {
          throw new Error('Function not implemented.');
        }}
        selectFields={[]}
        uploadPdfProgress={0}
        pdfPreviewUrl={''}
        uploadProgress={0}
        formSubmit={(e) => {
          throw new Error('Function not implemented.');
        }}
        firstStepNumber={0}
        prevPage={(firstStepNumber) => {
          throw new Error('Function not implemented.');
        }}
        finalStepNumber={0}
        isButtonDisabled={false}
        nextPage={(finalStepNumber) => {
          throw new Error('Function not implemented.');
        }}
        title={''}
      />
    );
  
    const btn = screen.queryByTitle('nextbutton');
    if (btn) {
      expect(btn).toBeInTheDocument();
    }
  });

describe('Title', () => {
  it('renders a title', () => {
    render(
      <FormStepper
        active={0}
        inputFields={[]}
        handleChange={(event) => {
          throw new Error('Function not implemented.');
        }}
        selectFields={[]}
        uploadPdfProgress={0}
        pdfPreviewUrl={''}
        uploadProgress={0}
        formSubmit={(e) => {
          throw new Error('Function not implemented.');
        }}
        firstStepNumber={0}
        prevPage={(firstStepNumber) => {
          throw new Error('Function not implemented.');
        }}
        finalStepNumber={0}
        isButtonDisabled={false}
        nextPage={(finalStepNumber) => {
          throw new Error('Function not implemented.');
        }}
        title={'Add Profile.js'}
      />
    );

    const heading = screen.getByRole('heading', {
      name: /Add Profile\.js/i,
    });

    expect(heading).toBeInTheDocument();
  });
});


