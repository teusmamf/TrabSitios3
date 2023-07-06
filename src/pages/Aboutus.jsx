import React from "react";
import { Link } from "react-router-dom";






export default function AboutUs(){
    return (
        <div>
            <h2 className="AboutUS_title">Sobre Nós</h2>
            
            <p className="AboutUS_text">Bem-vindo ao Grand Fernande's, um restaurante fictício que combina o charme clássico com uma culinária inovadora. Desde a sua inauguração, temos o prazer de oferecer aos nossos clientes uma experiência gastronômica única e memorável.

Localizado no coração da cidade, o Grand Fernande's é conhecido por seu ambiente elegante e acolhedor. Nossas instalações foram cuidadosamente projetadas para proporcionar um ambiente confortável e sofisticado, onde os clientes podem desfrutar de uma refeição tranquila e relaxante.

A nossa equipe de profissionais talentosos é apaixonada por gastronomia e dedicada a criar pratos excepcionais. Nossos chefs experientes trazem uma abordagem criativa à culinária, combinando ingredientes frescos e de alta qualidade para criar sabores surpreendentes. Do clássico ao contemporâneo, nosso cardápio oferece uma ampla variedade de opções para atender a todos os paladares.

No Grand Fernande's, valorizamos a experiência do cliente acima de tudo. Nossa equipe altamente treinada e cortês está sempre pronta para atender às necessidades e expectativas dos clientes. Desde a recepção calorosa até o serviço impecável, nos esforçamos para garantir que cada visita seja verdadeiramente excepcional.

</p>

<p className="AboutUS_text">Além de nossa oferta gastronômica, também organizamos eventos especiais e jantares temáticos para tornar sua experiência no Grand Fernande's ainda mais emocionante. Seja um jantar romântico à luz de velas, uma noite de música ao vivo ou uma degustação de vinhos, temos algo para todos os gostos.

No Grand Fernande's, também nos preocupamos com o meio ambiente e a sustentabilidade. Trabalhamos em parceria com fornecedores locais, priorizando ingredientes orgânicos e de origem sustentável sempre que possível. Nosso compromisso é proporcionar uma experiência gastronômica deliciosa e consciente.

Estamos ansiosos para recebê-lo no Grand Fernande's e compartilhar com você a nossa paixão pela comida, serviço excepcional e ambiente acolhedor. Venha nos visitar e desfrute de uma experiência gastronômica inesquecível.</p>

<Link to="/home" className="btn_update_home_final">Ir para Home</Link>
        </div>
    )
}