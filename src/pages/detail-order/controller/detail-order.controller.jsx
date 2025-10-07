// DetailOrderController.jsx

import React, { useState } from 'react';
import OrderDetailsView from '../view/detail-order.view'; // Caminho para sua View
import mockData from '../../../../bdMock.json'; // Caminho para seu arquivo bdMock.json

export default function DetailOrderController() {
    // Carrega o primeiro pedido do mockData
    const [order] = useState(mockData.pedidos[0]); 
    const [selectedReferenceImage, setSelectedReferenceImage] = useState(null);

    const handleCancel = () => {
        console.log('Cancelar pedido');
        // Implementar lógica de navegação ou estado para fechar/voltar
    };

    const handleEdit = (orderToEdit) => {
        console.log('Editar pedido:', orderToEdit.id);
        // Implementar lógica de navegação ou estado para editar
    };

    // Lógica de formatação para as imagens de referência
    const formattedImages = order.referenceImages?.map((url, i) => ({
        id_anexo: i + 1,
        nome_arquivo: `ref-${i + 1}.jpg`,
        imagem_anexo: url,
    })) || [];

    const refImages = {
        loading: false, // Setado como false, pois os dados são mockados e "instantâneos"
        error: null,
        images: formattedImages,
        refetch: () => console.log('Refetch de imagens'),
        userUploadedImage: null,
        selectedReferenceImage: selectedReferenceImage,
        setSelectedReferenceImage: setSelectedReferenceImage,
    };

    return (
        <OrderDetailsView
            order={order}
            onCancel={handleCancel}
            onEdit={handleEdit}
            refImages={refImages}
        />
    );
}