import * as React from 'react';
import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ProductCard } from './product-card.component';

// componente que lista produtos agrupados por tipo (massas, recheios, etc)
export function ProductList({
  products, // array de produtos para exibir
  onEditProduct, // função para editar um produto
  onDeleteProduct, // função para excluir um produto
}) {
  // agrupa produtos e ingredientes por tipo usando memoização para performance
  const groupedItems = React.useMemo(() => {
    const groups = {
      'Componentes do Bolo': {
        Massas: [],
        Recheios: [],
        Adicionais: [],
      },
      'Itens Complementares': {
        Salgados: [],
        Doces: [],
        Sobremesas: [],
      },
    };

    products.forEach(item => {
      // Padroniza o item para garantir que 'is_premium' sempre exista
      const normalizedItem = {
        ...item,
        is_premium: item.is_premium || false,
      };

      if (normalizedItem.isIngredient === true) {
        // --- LÓGICA PARA INGREDIENTES ---

        const tipoId = normalizedItem.tipoIngrediente?.idTipoIngrediente;
        const tipoNome = normalizedItem.tipoIngrediente?.descricao?.toLowerCase();

        // Atribui um preço apenas se o ingrediente não tiver um
        if (normalizedItem.preco === undefined) {
          normalizedItem.preco = normalizedItem.is_premium ? 8 : 5;
        }

        if (tipoId === 1 || tipoNome === 'massa') {
          groups['Componentes do Bolo']['Massas'].push(normalizedItem);
        } else if (tipoId === 2 || tipoNome === 'recheio') {
          groups['Componentes do Bolo']['Recheios'].push(normalizedItem);
        } else if (tipoId === 3 || tipoNome === 'adicional') {
          groups['Componentes do Bolo']['Adicionais'].push(normalizedItem);
        }

      } else {
        // --- LÓGICA PARA PRODUTOS  ---
        const categoria = normalizedItem.categoria?.toLowerCase();

        if (categoria === 'salgados') {
          groups['Itens Complementares']['Salgados'].push(normalizedItem);
        } else if (categoria === 'doces') {
          groups['Itens Complementares']['Doces'].push(normalizedItem);
        } else if (categoria === 'sobremesas') {
          groups['Itens Complementares']['Sobremesas'].push(normalizedItem);
        }
      }
    });
    // Remove categorias vazias
    Object.keys(groups).forEach(mainGroup => {
      Object.keys(groups[mainGroup]).forEach(subGroup => {
        if (groups[mainGroup][subGroup].length === 0) {
          delete groups[mainGroup][subGroup];
        }
      });
      if (Object.keys(groups[mainGroup]).length === 0) {
        delete groups[mainGroup];
      }
    });

    return groups;
  }, [products]);

  return (
    <Box sx={{ mt: 3 }}>
      {Object.entries(groupedItems).map(([mainGroup, subGroups]) => (
        <Accordion
          key={mainGroup}
          defaultExpanded
          elevation={0}
          sx={{
            '&:before': {
              display: 'none',
            },
            mb: 2,
            backgroundColor: 'background.default',
          }}
        >
          {/* item expansível de componente bolo / itens complementares */}
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: 'background.default',
              borderRadius: '8px',
              padding: 0,
              '&.Mui-expanded': {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              },
            }}
          >
            <Typography
              variant='h6'
              sx={{ color: '#4A0404', fontWeight: '600' }}
            >
              {mainGroup}
            </Typography>
          </AccordionSummary>

          {/* contém todas as subcategorias, alinhados um abaixo do outro */}
          <AccordionDetails
            sx={{
              p: 0,
              margin: 0,
              '& .MuiAccordion-root': { px: 0 },
              backgroundColor: 'background.default',
            }}
          >
            {Object.entries(subGroups).map(([subGroup, items]) => (
              // cada subcategoria (massas, recheios, etc) é um accordion separado
              <Accordion
                key={subGroup}
                defaultExpanded
                elevation={0}
                sx={{
                  mb: 2,
                  '&:before': {
                    display: 'none',
                  },
                  p: 0,
                  backgroundColor: 'background.default',
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    backgroundColor: 'rgba(74, 4, 4, 0.03)',
                    borderRadius: '4px',
                    '&.Mui-expanded': {
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                    },
                    '& .MuiAccordionSummary-content': {
                      m: 0,
                    },
                  }}
                >
                  <Typography
                    variant='subtitle1'
                    sx={{
                      color: 'primary.main',
                      fontWeight: 'medium',
                      pl: 2,
                      borderLeft: '2.5px solid',
                      borderColor: 'primary.main',
                    }}
                  >
                    {subGroup}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    p: 2,
                    backgroundColor: 'background.default',
                  }}
                >
                  {items.map((item, index) => (
                    <ProductCard
                      key={`${item.isIngredient ? 'ingredient' : 'product'}-${item.idProduto || item.id_ingrediente || item.id || index}`}
                      name={item.nome || item.descricao}
                      weight={item.peso}
                      price={item.preco || item.preco_unitario || item.precoUnitario}
                      onEdit={() => onEditProduct(item)}
                      onDelete={() => onDeleteProduct(item)}
                      isIngredient={item.isIngredient}
                      unidadeMedida={item.unidade_medida}
                      ativo={item.ativo}
                      is_premium={item.is_premium}
                    />
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
