import React from 'react';
import PropTypes from 'prop-types';

import {
  Modal, ModalHeader, ModalBody,
} from 'reactstrap';

import { withTranslation } from 'react-i18next';

import { withUnstatedContainers } from './UnstatedUtils';

import AppContainer from '../services/AppContainer';
import PageContainer from '../services/PageContainer';

import ShareLinkList from './ShareLinkList';
import ShareLinkForm from './ShareLinkForm';

class OutsideShareLinkModal extends React.Component {

  constructor() {
    super();
    this.state = {
      isOpenShareLinkForm: false,
    };

    this.toggleShareLinkFormHandler = this.toggleShareLinkFormHandler.bind(this);
  }

  toggleShareLinkFormHandler() {
    this.setState({ isOpenShareLinkForm: !this.state.isOpenShareLinkForm });
  }

  deleteAllLinksHandler() {
    console.log('hoge');
  }

  render() {
    return (
      <Modal size="lg" isOpen={this.props.isOpen} toggle={this.props.onClose}>
        <ModalHeader tag="h4" toggle={this.props.onClose} className="bg-primary text-light">Title
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="form-inline mb-3">
              <h4>Shared Link List</h4>
              <button className="ml-auto btn btn-danger" type="button" onClick={this.deleteAllLinksHandler}>Delete all links</button>
            </div>

            <div>
              <ShareLinkList />
              <button
                className="btn btn-outline-secondary d-block mx-auto px-5 mb-3"
                type="button"
                onClick={this.toggleShareLinkFormHandler}
              >
                {this.state.isOpenShareLinkForm ? 'Close' : 'New'}
              </button>
              {this.state.isOpenShareLinkForm && <ShareLinkForm onCloseForm={this.toggleShareLinkFormHandler} />}
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }

}

/**
 * Wrapper component for using unstated
 */
const ModalControlWrapper = withUnstatedContainers(OutsideShareLinkModal, [AppContainer, PageContainer]);

OutsideShareLinkModal.propTypes = {
  t: PropTypes.func.isRequired, //  i18next
  appContainer: PropTypes.instanceOf(AppContainer).isRequired,
  pageContainer: PropTypes.instanceOf(PageContainer).isRequired,

  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withTranslation()(ModalControlWrapper);
