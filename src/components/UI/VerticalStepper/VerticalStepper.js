import React, { Component } from 'react';

// import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import classes from './VerticalStepper.module.css';
import StepButton from '@material-ui/core/StepButton';

import { Button } from 'react-bootstrap';
  
class OrderStepper extends Component {
    state = {
        activeStep: 0,
        completed: new Set(),
        skipped: new Set(),
    };

    totalSteps = () => {
      return this.props.steps.length;
    };

    isStepOptional = (step) => {
      return step === 2
    };

    handleSkip = () => {
      const { activeStep } = this.state;
      if (!this.isStepOptional(activeStep)) {
        // Proteção apenas por precaução
        // Somente vai acontecer quando ocorrer tentativa ativa para quebrar algo no fonte
        throw new Error("You can't skip a step that isn't optional.");
      }
  
      this.setState(state => {
        const skipped = new Set(state.skipped.values());
        skipped.add(activeStep);
        return {
          activeStep: state.activeStep + 1,
          skipped,
        };
      });
    };

    handleNext = () => {
      let activeStep;

      if (this.isLastStep() && !this.allStepsCompleted()) {
        // É o último passo mas nem todos os passos foram completados
        // Encontra o primeiro passo que não foi completado
        const steps = this.props.steps;
        activeStep = steps.findIndex((step, i) => !this.state.completed.has(i));
      } else {
        activeStep = this.state.activeStep + 1;
      }
      this.setState({
        activeStep,
      });
    };

    // handleBack = () => {
    //   this.setState(state => ({
    //     activeStep: state.activeStep - 1,
    //   }));
    // };

    handleStep = step => () => {
      this.setState({
        activeStep: step,
      });
    }

    handleComplete = () => {
      const completed = new Set(this.state.completed);
      completed.add(this.state.activeStep);
      this.setState({
        completed,
      });

      /**
       * Sigh... it would be much nicer to replace the following if conditional with
       * `if (!this.allStepsComplete())` however state is not set when we do this,
       * thus we have to resort to not being very DRY.
       */
      if (completed.size !== this.totalSteps() - this.skippedSteps()) {
        this.handleNext();
      }
    };

    handleReset = () => {
        this.setState({
          activeStep: 0,
          completed: new Set(),
          skipped: new Set(),
      });
    };

    skippedSteps() {
      return this.state.skipped.size;
    }
  
    isStepSkipped(step) {
      return this.state.skipped.has(step);
    }
  
    isStepComplete(step) {
      return this.state.completed.has(step);
    }
  
    completedSteps() {
      return this.state.completed.size;
    }
  
    allStepsCompleted() {
      return this.completedSteps() === this.totalSteps() - this.skippedSteps();
    }
  
    isLastStep() {
      return this.state.activeStep === this.totalSteps() - 1;
    }

    render () {
        const steps = this.props.steps;
        const stepsContent = this.props.stepsContent;
        const { activeStep } = this.state

        // todo: aplicar conceito de tema para Material UI. Útil para projeto posterior

        return (
            <div className={classes.Root}>
                <Stepper nonLinear activeStep={activeStep} orientation="vertical">
                {
                  steps.map((label, index) => {
                    const props = {};
                    const buttonProps = {};
                    // if (this.isStepOptional(index)) {
                    //   buttonProps.optional = <p variant="caption">Optional</p>;
                    // }
                    if (this.isStepSkipped(index)) {
                      props.completed = false;
                    }
                    return (
                      <Step key={label} {...props}>
                        <StepButton disableRipple
                          onClick={this.handleStep(index)}
                          completed={this.isStepComplete(index)}
                          {...buttonProps}
                        >
                          {label}
                        </StepButton>
                        <StepContent>
                          {stepsContent[index]}
                          <div className={classes.ActionsContainer}>
                            <div>
                            {this.isStepOptional(activeStep) &&
                              !this.state.completed.has(this.state.activeStep) && (
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={this.handleSkip}
                                  className={classes.Button}
                                  size="sm"
                                >
                                  Pular
                                </Button>
                              )}
                              {activeStep !== steps.length &&
                                (
                                  <Button variant="contained" color="primary" onClick={this.handleComplete} className={classes.Button} size="sm">
                                    Passo OK
                                  </Button>
                                )}
                            </div>
                          </div>
                      </StepContent>
                      </Step>
                    );
                  })
                }
                </Stepper>
                {
                  this.allStepsCompleted() && (
                    <div className={classes.ResetContainer}>
                        <p>Todos os passos completos</p>
                        <Button onClick={this.handleReset} className={classes.Button} size="sm">
                          Reiniciar
                        </Button>
                    </div>
                  )
                }
            </div>
        );
    }
}

export default (OrderStepper);