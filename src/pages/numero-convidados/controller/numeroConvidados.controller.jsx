import { NumeroConvidadosView } from "../view/numeroConvidados.view";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES_PATHS } from "../../../utils/enums/routes-url";

export function NumeroConvidadosController() {
    const navigate = useNavigate();

    const [fields, setFields] = useState({
        quantidade: '',
    });

    const [errors, setErrors] = useState({
        quantidade: '',
    });

    const validate = () => {
        let valid = true;
        let newErrors = { quantidade: '' };

        if (!fields.quantidade) {
            newErrors.quantidade = 'A quantidade é obrigatória.';
            valid = false;
        } else if (isNaN(fields.quantidade) || fields.quantidade <= 0) {
            newErrors.quantidade = 'Digite um número válido maior que zero.';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const onChange = (field, value) => {
        setFields(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: '' })); // Limpa o erro ao modificar o campo
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Navega para a próxima página ou realiza outra ação
            navigate(ROUTES_PATHS.CART);
        }
    };

    return (
        <NumeroConvidadosView
            fields={fields}
            errors={errors}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    );
}