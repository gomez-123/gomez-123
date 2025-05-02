<?php 
include('../../app/config.php');
include('../../admin/layout/parte1.php');

include('../../app/controllers/usuarios/listado_de_usuarios.php'); 
?>

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
  <br>
  <div class="content">
    <div class="container">
      <div class="row">
        <h1>Listado de usuarios</h1>
      </div>
      <br>
      <div class="row">

        <div class="col-md-12">
          <div class="card card-outline card-primary">
            <div class="card-header">
              <h3 class="card-title">Usuarios Registrados</h3>
              <div class="card-tools">
                <a href="create.php" class="btn btn-primary"><i class="bi bi-plus-square"></i> Crear nuevo usuario</a>
              </div>
            </div>
            <div class="card-body">
              <table id="example1" class="table table-striped table-bordered table-hover table-sm">
                <thead>
                  <tr>
                    <th><center>Nro</center></th>
                    <th><center>Nombres del Usuario</center></th>
                    <th><center>Rol</center></th>
                    <th><center>Email</center></th>
                    <th><center>Fecha de creación</center></th>
                    <th><center>Estado</center></th>
                    <th><center>Acciones</center></th>
                  </tr>
                </thead>
                <tbody>
                  <?php
                  $contador_usuarios = 0;
                  foreach ($usuarios as $usuario) {
                    $id_usuario = $usuario['id_usuario'];
                    $contador_usuarios = $contador_usuarios +1; ?>
                    <tr>
                      <td><center><?= $contador_usuarios; ?></center></td>
                      <td><center><?= $usuario['nombres']; ?></center></td>
                      <td><center><?= $usuario['nombre_rol']; ?></center></td>
                      <td><center><?= $usuario['email']; ?></center></td>
                      <td><center><?= $usuario['fyh_creacion']; ?></center></td>
                      <td><center><?= $usuario['estado']; ?></center></td>
                      <td>
                        <div class="btn-group" role="group" aria-label="Basic example">
                          <a href="show.php?id=<?= $id_usuario; ?>" type="button" class="btn btn-info btn-sm"><i class="bi bi-eye"></i></a>
                          <a href="edit.php?id=<?= $id_usuario; ?>" type="button" class="btn btn-success btn-sm"><i class="bi bi-pencil"></i></a>
                          <form action="<?= APP_URL; ?>/app/controllers/usuarios/delete.php" onclick="preguntar<?= $id_usuario; ?>(event, <?= $id_usuario; ?>)" method="post" id="miFormulario<?= $id_usuario; ?>">
                            <input type="hidden" name="id_usuario" value="<?= $id_usuario; ?>">
                            <button type="submit" class="btn btn-danger btn-sm" style="border-radius: 0px 5px 5px 0px"><i class="bi bi-trash"></i></button>
                          </form>
                        </div>
                      </td>
                    </tr>
                    <?php
                  }
                  ?>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <br>
    </div>
  </div>
</div>
<!-- /.content-wrapper -->

<?php
include('../../admin/layout/parte2.php');
include('../../layout/mensajes.php');
?>

<script>
  function preguntar<?= $id_usuario; ?>(event, id_usuario) {
    event.preventDefault();
    Swal.fire({
      title: 'Eliminar registro',
      text: '¿Desea eliminar este registro?',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#a5161d',
      denyButtonColor: '#270a0a',
      denyButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        var form = $('#miFormulario' + id_usuario);
        form.submit();
      }
    });
  }

  $(function () {
    $("#example1").DataTable({
      "pageLength": 5,
      "language": {
        "emptyTable": "No hay información",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ Usuarios",
        "infoEmpty": "Mostrando 0 a 0 de 0 Usuarios",
        "infoFiltered": "(Filtrado de _MAX_ total Usuarios)",
        "thousands": ",",
        "lengthMenu": "Mostrar _MENU_ Usuarios",
        "loadingRecords": "Cargando...",
        "processing": "Procesando...",
        "zeroRecords": "Sin resultados encontrados",
        "paginate": {
          "first": "Primero",
          "last": "Ultimo",
          "next": "Siguiente",
          "previous": "Anterior"
        }
      },
      "responsive": true, 
      "lengthChange": true, 
      "autoWidth": false,
      buttons: [
        {
          extend: 'collection',
          text: 'Reportes',
          orientation: 'landscape',
          buttons: [
            { text: 'Copiar', extend: 'copy' },
            { extend: 'pdf' },
            { extend: 'csv' },
            { extend: 'excel' },
            { text: 'Imprimir', extend: 'print' }
          ]
        },
        {
          extend: 'colvis',
          text: 'Visor de columnas',
          CollectionLayout: 'fixed three-column'
        }
      ]
    }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
  });
</script>
