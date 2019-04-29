import React, { Component } from 'react';

// import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import classes from './VerticalStepper.module.css';
import StepButton from '@material-ui/core/StepButton';

import { Button } from 'react-bootstrap';

/*
* todo: criar componente próprio para vertical stepper usando componentes puros
*
* Componentes Material-UI apresentam desempenho ruim de rederização em comparação
* a componentes puros ou a componentes react-bootstrap.
* O componente Stepper (Material-UI) foi a primeira escolha mas apresenta uma
* pequena lentidão perceptível na mudança entre passos e renderização dos
* componentes internos.
* O uso do componente withStyles (Material-UI) piora ainda mais o tempo de
* renderização.
*/

class VerticalStepper extends Component {
    state = {
        activeStep: 0,
        completed: new Set(),
        skipped: new Set(),
    };

    totalSteps = () => {
      return this.props.steps.length;
    };

    isStepOptional = (step) => {
      return this.props.optionalSteps.includes(step);
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
      // se passo validação do paso corrente ok prossegue
      const isValid = this.props.stepsValidation[this.state.activeStep];
      isValid(this.state.activeStep)
        .then(() => {
          const completed = new Set(this.state.completed);
          const skipped = new Set(this.state.skipped);
          completed.add(this.state.activeStep);
          skipped.delete(this.state.activeStep);
          this.setState({
            completed,
            skipped
          });

          /**
           * Sigh... it would be much nicer to replace the following if conditional with
           * `if (!this.allStepsComplete())` however state is not set when we do this,
           * thus we have to resort to not being very DRY.
           */
          if (completed.size !== this.totalSteps() - this.skippedSteps()) {
              this.handleNext();
          }
        });
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
                          {
                            // Componente recebido em lista precisa ser clonado para passagem de props do parent
                            React.isValidElement(stepsContent[index]) ?
                              React.cloneElement(stepsContent[index], {handleComplete: this.handleComplete}) :
                              stepsContent[index]
                          }
                          <div className={classes.ActionsContainer}>
                            <div className="col-lg-12 col-md-12">
                            {this.isStepOptional(activeStep) &&
                              !this.state.completed.has(this.state.activeStep) && (
                                <Button
                                  variant="outline-secondary"
                                  onClick={this.handleSkip}
                                  className={classes.Button}
                                  size="sm"
                                  style={{float: 'right'}}
                                >
                                  Pular
                                </Button>
                              )}
                              {activeStep !== steps.length &&
                                (
                                  <Button
                                    style={{float: 'right'}}
                                    variant="outline-secondary"
                                    onClick={this.handleComplete}
                                    className={classes.Button}
                                    size="sm"
                                  >
                                    Próximo
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

export default VerticalStepper;
