import { AddressMenuComponent } from '../address-menu/address-menu.component';
import { NewAddressComponent } from '../new-address/new-address.component';

export function DeliveryLocationComponent({
  addresses,
  selectedAddressId,
  isAddingAddress,
  fields,
  errors,
  isCepLoading,
  onSelectAddress,
  onAddNewAddress,
  onBackToAddressMenu,
  onChange,
  onSubmit
}) {
  return !isAddingAddress ? (
    <AddressMenuComponent
      addresses={addresses}
      selectedAddressId={selectedAddressId}
      onSelectAddress={onSelectAddress}
      onAddNewAddress={onAddNewAddress}
      onConfirm={() => {}}
    />
  ) : (
    <NewAddressComponent
      fields={fields}
      errors={errors}
      isCepLoading={isCepLoading}
      onChange={onChange}
      onSubmit={onSubmit}
      onBack={onBackToAddressMenu}
    />
  );
}

