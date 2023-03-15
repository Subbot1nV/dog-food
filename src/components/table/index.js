import { Image, Table as AntTable, Typography } from "antd"
import { pokemonData } from "./data";

const { Paragraph } = Typography;

const dataPokemon = pokemonData.map(pokemon => ({
    name: pokemon.name,
    number: pokemon.number,
    key: pokemon.id,
    classification: pokemon.classification,
    maxHP: pokemon.maxHP,
    maxCP: pokemon.maxCP,
    image: pokemon.image
}))

export const Table = ({ rows = 20 }) => { 

      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <Paragraph copyable>{text}</Paragraph>
        },
        {
          title: 'Number',
          dataIndex: 'number',
          key: 'number',
        },
        {
          title: 'Class',
          dataIndex: 'classification',
          key: 'classification',
          filters: [
            {
                text: 'Seed Pokémon',
                value: 'Seed Pokémon',
            },
            {
                text: 'Lizard Pokémon',
                value: 'Lizard Pokémon',
            },
            {
                text: 'Flame Pokémon',
                value: 'Flame Pokémon',
            }
        ],
        onFilter: (value, item) => item.classification.includes(value),
        },
        {
            title: 'MaximumHP',
            dataIndex: 'maxHP',
            key: 'maxHP',
            sorter: (a, b) => a.maxHP - b.maxHP,
            defaultSortOrder: 'ascend'
          },
          {
            title: 'MaximumCP',
            dataIndex: 'maxCP',
            key: 'maxCP',
          },
          {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (url) => <Image widt={150} src={url} preview={false} />
        },
      ];
      
    return <AntTable dataSource={dataPokemon} columns={columns} pagination={{
        pageSize: rows,
        showSizeChanger: false,
    }} />
}
