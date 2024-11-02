"""Welcome to Reflex! This file outlines the steps to create a basic app."""

import reflex as rx

from rxconfig import config


class State(rx.State):
    """The app state."""




def index() -> rx.Component:
    # Welcome Page (Index)
    return rx.container(
        rx.heading('Librohub', font_family = 'impact', text_align = 'center'),
        rx.vstack(
            rx.flex(
                rx.link('Inicio'),
                rx.link("Libros", href = '/libros'),
                rx.link("Carrito", href = '/carrito'),
                spacing = '5',
                text_align = 'center',
                width = '200%',
            ),

            rx.scroll_area(
                rx.flex(
                    rx.text('Descubre el placer de la lectura desde la comodida de tu hogar'),
                    rx.text(
                        '¡Bienvenido a librohub, tu tienda en línea de libros donde la pasión por la lectura se encuentra con la tecnología! En librohub, creemos que cada libro tiene el poder de abrir puertas y queremos que explres un mundo de conocimiento, entretenimiento y aventura con un solo clic.'
                    ),
                    direction = 'column',
                    spacing = '4',
                ),
                type = 'always',
                scrollbars = 'vertical',
                style = {'height': 100},
            ),
        ),
    )


app = rx.App()
app.add_page(index)

