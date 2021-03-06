import { Component, Input, OnInit } from '@angular/core';
import { CursosService } from 'src/app/services/cursos.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/Models/Categoria';
import { Curso } from 'src/app/Models/Curso';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {


  cursos!: any;
  categorias!: Categoria[];
  cursosFiltrado!: Curso[];
  dataAtual: any = new Date();
@Input() cursoFormulario: any = {};


  constructor(
    private cursoService: CursosService,
    private categoriaService: CategoriasService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.ListarCategorias();
    this.ListarCursos();
  }

  ListarCursos(): void{
    this.cursoService.ListarCursos().subscribe((resul) => {
      this.cursos = resul;
    this.cursosFiltrado = resul;});
  }

  ListarCategorias(): void {
    this.categoriaService.ListarCategoria().subscribe((resul) => {
      this.categorias = resul; 
    });
  }
  LimparFormulario(): void {
    this.cursoFormulario.reset();
  }
  
  EnviarForm(): void{
    const curso: Curso = this.cursoFormulario.value; 
      if(curso.cursoId > 1 ){
        this.cursoService.AtualizarCurso(curso).subscribe({
          next: (resp) =>{
            this.toastr.success('Curso atualizado com sucesso!!', 'Atualizando');
            this.LimparFormulario();
            this.ListarCursos(); 
          },
          error: (resp) =>{
            this.toastr.error(resp.error.mensagem, 'Erro ao Atualizar');
            console.log(resp);
           this.LimparFormulario();
          }, 
        });
      } else{
        this.cursoService.AdicionarCurso(curso).subscribe({
          next:(resp)=>{
            this.toastr.success('Curso gravado com sucesso!!', 'Gravando');
        
            this.LimparFormulario();
            this.ListarCursos();
        },
          error: (resp) =>{
            this.toastr.error(resp.error.mensagem, 'Erro ao cadastrar');
           this.LimparFormulario();
          }, 
        });
      }
  }
}
