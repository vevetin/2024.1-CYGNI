import React, { useContext, useState } from "react";
import Botao from "../../components/Botao/Botao.jsx";
import { useNavigate } from "react-router-dom";
import Icone from "../../assets/img/IconeAGIS.svg";
import "./TelaRedefinicao.css";
import * as api from "../../services/api.jsx";
import { useForm } from "react-hook-form";
import { HiArrowUturnLeft } from "react-icons/hi2";
import { RedefinicaoContext } from "./redefinicaoContext.jsx";

const TelaRedefinicao = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navegar = useNavigate();

  const [formData, setFormData] = useState({
    novaSenha: "",
    novaSenhaConfirmacao: ""
  })

  function lidarComMudancaNoInput({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  const {email, token} = useContext(RedefinicaoContext);

  const aoEnviar = () => {
    navegar("/");
  };

  const aoVoltar = () => {
    navegar("/tela-recuperacao");
  };

  const senha = watch("senha");

  return (
    <div className="container-redefinicao">
      <div className="botao-voltar">
        <Botao
          id="voltar"
          icone={<HiArrowUturnLeft size={20} style={{ marginRight: "5px" }} />}
          texto="Voltar"
          cor="#032026"
          largura={"130px"}
          aoClicar={() => {
            navegar("/tela-recuperacao");
          }}
        />
      </div>
      <div className="formulario">
        <img id='img-icone' src={Icone} alt="icone" />
        <h1>Redefinir senha</h1>
        <form className="formulario-senha" onSubmit={handleSubmit(aoEnviar)}>
          <input
            type="password" id="senha" placeholder="Digite a nova senha"
            {...register("senha", { required: "Este campo é obrigatório" })} 
            onChange={(e) => lidarComMudancaNoInput(e)}
            name="novaSenha"
            />
          {errors.senha && <p className="mensagem-erro">{errors.senha.message}</p>}
          <input type="password" id="confirmarSenha"
            {...register("confirmarSenha", { required: "Confirmação de senha é obrigatória", validate: value => value === senha || "As senhas não coincidem" })}
            placeholder="Digite novamente a senha" 
            onChange={(e) => lidarComMudancaNoInput(e)}
            name="novaSenhaConfirmacao"
            />
          {errors.confirmarSenha && <p className="mensagem-erro">{errors.confirmarSenha.message}</p>}
        </form>
        <Botao id='botao-red' largura={'26%'} cor={'#FFA800'} corTexto={'#032026'} texto={'Recuperar'}
          aoClicar={async (e) => {
            e.preventDefault();
            try {
              await api.redefineSenha({email, novaSenha, novaSenhaConfirmacao, token})
              navegar("/");
            } catch (error) {
              alert(error);
            }
          }}
        />
      </div>



    </div>




  );
};
export default TelaRedefinicao; 