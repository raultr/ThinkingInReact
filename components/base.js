// Componente para mostrar la categoria
var ProductCategoryRow = React.createClass({
    render: function() {
        return (  <tr>
                   <th colSpan="2">{this.props.category}</th>
                  </tr>
                );
    }
});

// Componente para mostrar los detalles del producto
var ProductRow = React.createClass({
    render: function() {
        // Si hay existencia del producto se muestra en color negro
        // Si no hay existencia del producto se muestra en color rojo dentro de un span
        var name = this.props.product.stocked ?
            this.props.product.name :
            <span style={{color: 'red'}}>
                {this.props.product.name}
            </span>;
        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        );
    }
});

// Aqui se mostrara la lista de productos y categorias
var ProductTable = React.createClass({
    render: function() {
        var rows = [];
        var lastCategory = null;
        var id = 0;
        // Recibira una lista de productos
        this.props.products.forEach(function(product) {
            // Vemos si ya habiamos mostrado la categoria del producto
            if (product.category !== lastCategory) {
                // Metemos en nuestro array de filas un componente con la descripcion de la categoria
                rows.push(<ProductCategoryRow category={product.category} key={id} />);
            }
            // Metemos la descripcion del producto en el array de filas
            rows.push(<ProductRow product={product} key={product.name} />);
            // La ultima catergoria de producto
            lastCategory = product.category;
            id++;
        });
        // La tabla tendra un array de filas de tipo ProductRow o ProductCategory
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
});


// Es componente SearcBar tiene una caja de texto y un checkbox
var SearchBar = React.createClass({
    render: function() {
        return (
            <form>
                <input type="text" placeholder="Search..." />
                <p>
                    <input type="checkbox" />
                    {' '}
                    Only show products in stock
                </p>
            </form>
        );
    }
});

// El componente FilterableProductTable es el contenedor de los componentes SearchBar y ProductTable
var FilterableProductTable = React.createClass({
    render: function() {
        return (
            <div>
                <SearchBar />
                <ProductTable products={this.props.products} />
            </div>
        );
    }
});


// Lista de productos que se le pasa al componente ProductTable
var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
 
 // Se muestra del componente FilterableProductTable dentro del body pasandole la lista de productos
React.render(<FilterableProductTable products={PRODUCTS} />, document.body);