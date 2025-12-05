import { AddressMenuComponent } from '../address-menu/address-menu.component';
import { NewAddressComponent } from '../address-new/address-new.component';

export function AddressRedirectorComponent({ ...props }) {
  return props.isAddingAddress ? (
    <NewAddressComponent
      fields={props.fields}
      errors={props.errors}
      isCepLoading={props.isCepLoading}
      onChange={props.onChange}
      onSubmit={props.onSubmit}
      onBack={props.onBackToAddressMenu}
      isCepDataLoaded={props.isCepDataLoaded}
      areRequiredFieldsFilled={props.areRequiredFieldsFilled}
    />
  ) : (
    <AddressMenuComponent
      addresses={props.addresses}
      selectedAddressId={props.selectedAddressId}
      onSelectAddress={props.onSelectAddress}
      onAddNewAddress={props.onAddNewAddress}
      onFinishDelivery={props.onFinishDelivery}
    />
  );
}
