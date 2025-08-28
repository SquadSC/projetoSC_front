import { useState, useEffect } from 'react';
import { request } from '../../../utils/request';
import { getUserData } from '../../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';
import { OrderSummaryCakeView } from '../view/order-summary-cake.view';

export function OrderSummaryCakeController() {
    const navigate = useNavigate();



    return (
        <OrderSummaryCakeView
       
        />
      );
}
