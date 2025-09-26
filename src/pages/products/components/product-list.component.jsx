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
      console.log('Processando item:', item);
      if (item.isIngredient === true) {
        // Ingredientes do bolo
        const tipoId = item.tipoIngrediente?.id_tipo_ingrediente;
        const tipoNome = item.tipoIngrediente?.descricao?.toLowerCase();
        console.log('Tipo do ingrediente:', tipoNome, 'ID:', tipoId);

        if (tipoId === 1 || tipoNome === 'massa') {
          groups['Componentes do Bolo']['Massas'].push({
            ...item,
            nome: item.nome || item.descricao,
            preco: item.is_premium ? 10 : 0,
          });
        } else if (tipoId === 2 || tipoNome === 'recheio') {
          groups['Componentes do Bolo']['Recheios'].push({
            ...item,
            nome: item.nome || item.descricao,
            preco: item.is_premium ? 10 : 0,
          });
        } else if (tipoId === 3 || tipoNome === 'adicional') {
          groups['Componentes do Bolo']['Adicionais'].push({
            ...item,
            nome: item.nome || item.descricao,
            preco: item.is_premium ? 8 : 5,
          });
        }
      } else {
        // Produtos normais
        const categoria = item.categoria?.toLowerCase();
        if (categoria === 'salgados') {
          groups['Itens Complementares']['Salgados'].push(item);
        } else if (categoria === 'doces') {
          groups['Itens Complementares']['Doces'].push(item);
        } else if (categoria === 'sobremesas') {
          groups['Itens Complementares']['Sobremesas'].push(item);
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
            backgroundColor: '#FFF5F5',
          }}
        >
          {/* item expansível de componente bolo / itens complementares */}
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: '#FFF5F5',
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
            sx={{ p: 0, margin: 0, '& .MuiAccordion-root': { px: 0 }, backgroundColor: '#FFF5F5' }}
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
                  backgroundColor: '#FFF5F5',
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
                    backgroundColor: '#FFF5F5',
                  }}
                >
                  {items.map(item => (
                    <ProductCard
                      key={item.idProduto || item.id_ingrediente || item.id}
                      name={item.nome || item.descricao}
                      weight={item.peso}
                      price={item.preco || item.preco_unitario}
                      onEdit={() => onEditProduct(item)}
                      onDelete={() =>
                        onDeleteProduct(
                          item.idProduto || item.id_ingrediente || item.id,
                        )
                      }
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
