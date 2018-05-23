import React from "react";
import Payment from "./Payment";

class PaymentContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isDialogVisible: false,
      price: this.props.navigation.state.params.price,
      topUpAmount: this.props.navigation.state.params.topUpAmount
    }
  }

  _goBack = () => {
    this.setState({ isDialogVisible: false });
    this.props.navigation.pop();
  };

  _handlePayment = () => {
    // TODO: send payment request to server
    this.setState({ isDialogVisible: true });
  };

  render() {
    return (
      <Payment goBack={this._goBack} confirm={this._handlePayment} isDialogVisible={this.state.isDialogVisible} price={this.state.price} topUpAmount={this.state.topUpAmount}/>
    )
  }
}

export default PaymentContainer;
