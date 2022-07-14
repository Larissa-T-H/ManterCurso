<<<<<<< HEAD
import { Component, Input, OnInit } from '@angular/core';
import { CursosService } from 'src/app/services/cursos.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
=======
import { Component, OnInit } from '@angular/core';
import { CursosService } from 'src/app/services/cursos.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
>>>>>>> 8e7b8064d69c5220248b45b2bfde3e931b7dc8f8
import { Categoria } from 'src/app/Models/Categoria';
import { Curso } from 'src/app/Models/Curso';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

<<<<<<< HEAD
  cursos!: any;
  categorias!: Categoria[];
  cursosFiltrado!: Curso[];
  dataAtual: any = new Date();
@Input() cursoFormulario: any = {};
=======
  formulario: any = [];
  cursos!: any;
  categorias!: Categoria[];
  cursoFormulario!: FormGroup;
  cursosFiltrado!: Curso[];
  tituloForm!: string;
  idDeletar!: number;
  buscaFormulario!: FormGroup;
  dataAtual: any = new Date();
  private _filtrarCursos!: string;
  
  mostrar: boolean = false;

  toggle () {
    this.mostrar = !this.mostrar;
  }

>>>>>>> 8e7b8064d69c5220248b45b2bfde3e931b7dc8f8

  constructor(
    private cursoService: CursosService,
    private categoriaService: CategoriasService,
<<<<<<< HEAD
=======
    private formBuilder: FormBuilder,
>>>>>>> 8e7b8064d69c5220248b45b2bfde3e931b7dc8f8
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.ListarCategorias();
    this.ListarCursos();
<<<<<<< HEAD
=======
    this.tituloForm = 'Novo Curso';
    this.cursoFormulario = this.formBuilder.group({
      cursoId: [0],
      descricao: ['', Validators.compose([Validators.required])],
      dataInicio: ['', Validators.compose([Validators.required])],
      dataTermino: ['', Validators.compose([Validators.required])],
      quantidade: [0],
      isStatus: [true],
      categoriaId: ['', Validators.required],
    });

    this.buscaFormulario = this.formBuilder.group({
      dataInicialFiltro : [],
      dataFinalFiltro : [],
      busca: []
    })
  }


  public get filtrarListaCursos(){
    return this._filtrarCursos;
  }

  public set filtrarListaCursos(value:string){
    this._filtrarCursos = value;
    this.cursosFiltrado = this.filtrarListaCursos ? this.filtorCurso(this.filtrarListaCursos) : this.cursos;
  }

  filtorCurso(filtrar: string): any{
    filtrar = filtrar.toLocaleLowerCase();
    return this.cursos.filter((Curso: {descricao: string}) => Curso.descricao.toLocaleLowerCase().indexOf(filtrar) !== -1);
>>>>>>> 8e7b8064d69c5220248b45b2bfde3e931b7dc8f8
  }

  ListarCursos(): void{
    this.cursoService.ListarCursos().subscribe((resul) => {
      this.cursos = resul;
<<<<<<< HEAD
      console.log(resul);
=======
>>>>>>> 8e7b8064d69c5220248b45b2bfde3e931b7dc8f8
    this.cursosFiltrado = resul;});
  }

  ListarCategorias(): void {
    this.categoriaService.ListarCategoria().subscribe((resul) => {
      this.categorias = resul; 
    });
  }

<<<<<<< HEAD
  LimparFormulario(): void {
    this.cursoFormulario.reset();
  }


  EnviarForm(): void{
    const curso: Curso = this.cursoFormulario.value;
    console.log(curso)  
      if(curso.cursoId < 0){
        this.cursoService.AdicionarCurso(curso).subscribe({
          next:(resp)=>{
            this.toastr.success('Curso gravado com sucesso!!', 'Gravando');
        
            this.LimparFormulario();
            this.ListarCursos();
        },
          error: (resp) =>{console.log(resp);
           if(resp.error){
            this.toastr.error('Curso e/ou Data já cadastrado', 'Erro ao cadastrar')
           } else {
              this.toastr.error(resp.error, 'Erro cas');
           }
           this.LimparFormulario();
=======
  public getCursos(): void {
    this.cursoService.ListarCursos().subscribe(
      resultado => {
        this.cursos = resultado,
        this.cursosFiltrado = this.cursos.$values
      }
    );
    }

  LimparFormulario(): void {
    this.buscaFormulario.reset();
    this.cursoFormulario.reset();
    this.cursoFormulario.controls['cursoId'].setValue(0);
    this.cursoFormulario.controls['isStatus'].setValue(true);
    this.cursoFormulario.controls['quantidade'].setValue(0);
    this.idDeletar = 0;
  }

  ExibirModalCadastro(): void {
    this.tituloForm = 'Curso Novo';
    this.formulario = new FormGroup({
      nome: new FormControl(null, [Validators.required])
    });
  }
 

  ModalAtualizar(cursoId: any): void {
    this.cursoService.PegarCursoId(cursoId).subscribe(resultado => {
      this.tituloForm = `Atualizar: `;

      this.formulario = new FormGroup({
        cursoId: new FormControl(resultado.cursoId),
        descricao: new FormControl(resultado.descricao, [Validators.required]),
      });
    });
  }



  CarregarModalEdit(curso: any) {
    this.tituloForm = 'Editar Curso';
    this.cursoFormulario.controls['cursoId'].setValue(curso.cursoId);
    this.cursoFormulario.controls['descricao'].setValue(curso.descricao);
    this.cursoFormulario.controls['dataInicio'].setValue(curso.dataInicio);
    this.cursoFormulario.controls['dataTermino'].setValue(curso.dataTermino);
    this.cursoFormulario.controls['isStatus'].setValue(curso.isStatus);
    this.cursoFormulario.controls['quantidade'].setValue(curso.quantidade);
    this.cursoFormulario.controls['categoriaId'].setValue(curso.categoriaId);
  }

  EnviarForm(){
    const curso: Curso = this.cursoFormulario.value;
    console.log(curso)
    if(this.cursoFormulario.valid){   
      if(curso.cursoId > 0){
        this.cursoService.AdicionarCurso(curso).subscribe({
          next:(resp)=>{
            this.toastr.success('Curso gravado com sucesso!!', 'Gravando');
            this.LimparFormulario();
            this.ListarCursos(); 
        },
          error: (resp) =>{console.log(resp);
           if(resp.error.erros || resp.error == null){
            this.toastr.error('Erro!!!', 'Erro')
           } else {
              this.toastr.error(resp.error, 'Erro');
           }
>>>>>>> 8e7b8064d69c5220248b45b2bfde3e931b7dc8f8
          }, 
        });
      } else{
        this.cursoService.AtualizarCurso(curso).subscribe({
          next: (resp) =>{
            this.toastr.success('Curso atualizado com sucesso!!', 'Atualizando');
            this.LimparFormulario();
<<<<<<< HEAD
            this.ListarCursos(); 
          },
          error: (resp) =>{
            if(resp.error){
              this.toastr.error('Curso e/ou Data já cadastrado', 'Erro ao atualizar')
              } else {
                  this.toastr.error(resp.error, 'Erro at');
              }
              this.LimparFormulario();
            },
        });
      }
  } 
}
=======
            this.ListarCursos();
          },
          error: (resp) =>{
            if(resp.error.erros || resp.error == null){
              this.toastr.error('Erro!!!', 'Erro')
              } else {
                  this.toastr.error(resp.error, 'Erro');
              }
            },
        });
      }
    } else{
      this.toastr.error('Preencha todos os campos Obrigatórios', 'Erro!!');
    }
  } 
  DEletarCruso(cursoId: number){}

}
>>>>>>> 8e7b8064d69c5220248b45b2bfde3e931b7dc8f8
