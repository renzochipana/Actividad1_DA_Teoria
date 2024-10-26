import reflex as rx

class Libro(rx.Base):
    titulo: str
    costo: float


class State(rx.State):
    libros: list[Libro] = []
    new_libro: str = ''
    new_costo: float = 0.0

    new_busq: str = ''
    result: Libro = None


    def add_libro(self):
        if self.new_libro and self.new_costo:
            self.libros.append(Libro(titulo=self.new_libro, costo = self.new_costo))
            self.new_libro = ''
            self.new_costo = 0.0

    def delete_libro(self, index:int):
        self.libros.pop(index)

    def search_libro(self):
        for item in self.libros:
            if self.new_busq == item.titulo:
                self.result = item
                return
        self.result = None
       
    

def item_libros(libro:Libro, index:int):
    return rx.hstack(
        rx.vstack(
            rx.text(
                'titulo:',
            ),
            rx.heading(
                libro.titulo,
                color_scheme = 'blue',
                font_family = 'Times New Roman',
            ),
        ),

        rx.vstack(
            rx.heading(
                'S/. ',
                libro.costo,
                color_scheme = 'green',
                font_family = 'Times New Roman',
            ),
        ),

        rx.button(
            "Borrar",
            on_click = State.delete_libro(index),
            size = 'sm',
            color_scheme = 'red',
        ),

        rx.button(
            'Agregar al carrito',
            on_click = StateCarrito.add_carrito(libro),
            size = 'sm',
            color_scheme = 'green',
        ), 
    )
class StateCarrito(rx.State):
    carrito: list[Libro] = []

    def add_carrito(self, libro: Libro):
        self.carrito.append(libro)
    
    def borrar_carrito(self, index: int):
        self.carrito.pop(index)

def item_carrito(libro:Libro, index: int):
    return rx.hstack(
        rx.vstack(
            rx.text(
                'titulo:',
            ),
            rx.heading(
                libro.titulo,
                color_scheme = 'blue',
                font_family = 'Times New Roman',
            ),
        ),

        rx.vstack(
            rx.heading(
                'S/. ',
                libro.costo,
                color_scheme = 'green',
                font_family = 'Times New Roman',
            ),
        ),

        rx.button(
            "Quitar",
            on_click = StateCarrito.borrar_carrito(index),
            size = 'sm',
            color_scheme = 'red',
        ),
    )

def encontrar(libro: Libro):
    return rx.vstack(
        rx.heading('Libro encontrado'),
        rx.hstack(
            rx.vstack(
                rx.text(
                    'titulo:',
                ),
                rx.heading(
                    libro.titulo,
                    color_scheme = 'blue',
                    font_family = 'Times New Roman',
                ),
            ),

            rx.hstack(
                rx.heading(
                    'S/. ',
                    libro.costo,
                    color_scheme = 'green',
                    font_family = 'Times New Roman',
                ),
            ),

            rx.button(
            'Agregar al carrito',
            on_click = StateCarrito.add_carrito(libro),
            size = 'sm',
            color_scheme = 'green',
            ),
        ),
    ),
    

@rx.page(route = 'libros', title = 'libros')
def libros() -> rx.Component:
    return rx.container(
        rx.heading('Librohub', font_family = 'Impact', text_align = 'center'),
        rx.hstack(
            rx.vstack(
                rx.flex(
                    rx.link('Inicio', href = '/'),
                    rx.link("Libros", href = '/libros'),
                    rx.link("Carrito", href = '/carrito'),
                    spacing = '5',
                    text_align = 'center',
                    width = '200%',
                ),

                rx.input(
                    placeholder = 'Ingrese el titulo',
                    value = State.new_libro,
                    on_change = State.set_new_libro,
                ),

                rx.input(
                    placeholder = 'Ingrese el costo del titulo',
                    type = 'int',
                    value = State.new_costo,
                    on_change = State.set_new_costo,
                ),

                rx.button("Agregar libro", on_click = State.add_libro),
                rx.flex(
                    rx.cond(
                        State.libros,
                        rx.vstack(
                            rx.heading("Libros", size = 'md', color_scheme = 'red'),
                            rx.foreach(
                                State.libros,
                                item_libros,
                            ),
                        ),
                    ),
                ),
            ),
            rx.vstack(
                rx.heading('Busqueda de libros'),
                rx.input(
                    placeholder = 'Libro a buscar',
                    value = State.new_busq,
                    on_change = State.set_new_busq,
                ),

                rx.button('Buscar libro', on_click = State.search_libro),
                rx.cond(
                    State.result,
                    rx.flex(
                        rx.vstack(
                            encontrar(State.result), 
                        ),
                    ),
                ),

                rx.cond(
                    ~State.result,
                    rx.flex(
                        rx.vstack(
                            rx.heading('No se encontro resultados'), 
                        ),
                    ),
                )
            ),
        ),
    )