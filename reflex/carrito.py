import reflex as rx
from .libros import *


@rx.page(route = 'carrito', title = 'carrito')
def carrito() -> rx.Component:
    return rx.container(
        rx.heading('Librohub', font_family = 'impact', text_align = 'center'),
        rx.vstack(
            rx.flex(
                rx.link('Inicio', href = '/'),
                rx.link("Libros", href = '/libros'),
                rx.link("Carrito", href = '/carrito'),
                spacing = '5',
                text_align = 'center', 
            ),

            rx.flex(
                rx.cond(
                    StateCarrito.carrito,
                    rx.vstack(
                        rx.heading("Carrito", size = 'md', color_scheme = 'iris'),
                        rx.foreach(
                            StateCarrito.carrito,
                            item_carrito,
                        ),
                    ),
                ),
                
            ),
        ),
    )