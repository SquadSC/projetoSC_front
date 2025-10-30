import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NumberGuestsView } from "../view/number-guests.view";

export function NumberGuestsController() {
    const navigate = useNavigate();

    const [fields, setFields] = useState({
        quantidade: '',
    });

    const [errors, setErrors] = useState({
        quantidade: '',
    });

    const [resultado, setResultado] = useState(null);

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
            const qtd = Number(fields.quantidade);

            // regras de cálculo
            const boloKg = (qtd * 0.12).toFixed(1); // 120g por pessoa
            const salgados = qtd * 7;
            const doces = qtd * 5;

            setResultado({
                boloKg,
                salgados,
                doces,
                qtd
            });

            // limpa o campo de quantidade
            setFields({ quantidade: '' });
        }
    };

    return (
    <NumberGuestsView
        fields={fields}
        errors={errors}
        onChange={onChange}
        onSubmit={onSubmit}
        resultado={resultado}
    />
);
}
