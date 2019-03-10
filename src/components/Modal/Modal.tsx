import * as React from 'react';
import { Portal } from '../Popover/Portal';
import posed, { PoseGroup } from 'react-pose';
import { styleEnum } from '../../helpers/constants';

export class Modal extends React.Component<ModalProps, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, title, onClose, footer, isVisible } = this.props;

    return [(
      <Portal key='modal'>
        <PoseGroup>
          {isVisible && <Container
            key='container'
            style={{
              position: 'absolute',
              margin: 'auto',
              left: '0',
              right: '0',
              width: '70vw',
              height: '70vh',
              background: 'white',
              padding: '20px',
              zIndex: 1001,
              top: '10vh',
              boxShadow: styleEnum.shadow_2x,
            }}
          >
            {title && <h3 style={{ margin: '0' }}>{title}</h3>}
            <hr />
            {children}
            {footer && <div
              style={{
                position: 'absolute',
                bottom: '0',
                width: 'calc(100% - 40px)',
              }}
            >
              <hr />
              {footer}
            </div>}
          </Container>}
        </PoseGroup>
      </Portal>
    ), (
      <Portal key='overlay'>
        <PoseGroup>
          {isVisible && <Shade
            key='shade'
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 1000,
              overflow: 'auto',
              background: '#eeeeeeaa',
            }}
          />}
        </PoseGroup>
      </Portal>
    )];
  }
}

const Container = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 300,
    transition: {
      y: { type: 'spring', stiffness: 1000, damping: 15 },
      default: { duration: 300 },
    },
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 150 },
  },
});

const Shade = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 },
});

export interface ModalProps {
  children: React.ReactElement<any>;
  footer?: React.ReactNode;
  title?: React.ReactNode;
  style?: React.CSSProperties;
  isVisible?: boolean;
  closable?: boolean;
  onClose?: () => void;
}
