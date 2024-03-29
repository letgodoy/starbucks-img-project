import BlockIcon from '@mui/icons-material/Block';
import EditIcon from '@mui/icons-material/Edit';
import PlayIcon from '@mui/icons-material/PlayCircleOutline';
import { Box, Button, IconButton, Skeleton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { Layout, checkBrand } from "../../components";
import { useAuth } from '../../components/contexts/auth';
import { useGetAllUsers, useToggleBlockUser } from "../../dataAccess";
import { UserRoles } from '../../enums/UserRoles';
import { useValidateUserRole } from '../../hooks/useValidateUserRole';


export const ListUser = ({ params }: any) => {
  const canCreate = useValidateUserRole([UserRoles.ADMIN, UserRoles.DISTRICTMANAGER, UserRoles.MANAGERAGENCY, UserRoles.MANAGERPHOTO, UserRoles.MANAGERSTORE, UserRoles.OPERATIONMANAGER]);

  checkBrand()
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data, status: getUserStatus } = useGetAllUsers();
  const { mutateAsync, status: toggleBlockStatus } = useToggleBlockUser();

  const isLoading = getUserStatus === "loading" || toggleBlockStatus === "loading";
  const canRenderTable = getUserStatus === "success" && data && data?.length > 0;

  const userCanDoAction = (role: UserRoles) => {
    if (user.role === UserRoles.ADMIN) return true;

    if (user.role === UserRoles.OPERATIONMANAGER && role !== UserRoles.ADMIN) return true;

    if (user.role === UserRoles.DISTRICTMANAGER && role !== UserRoles.ADMIN && role !== UserRoles.OPERATIONMANAGER) return true;

    if (user.role === UserRoles.MANAGERSTORE && role === UserRoles.MANAGERSTORE) return true;

    if (user.role === UserRoles.MANAGERAGENCY && (role === UserRoles.MANAGERAGENCY || role === UserRoles.USERAGENCY)) return true;

    if (user.role === UserRoles.MANAGERPHOTO && (role === UserRoles.MANAGERPHOTO || role === UserRoles.USERPHOTO)) return true;

    return false;
  }

  if (isLoading) return (
    <Layout params={params}>
      <Skeleton variant="rectangular" width='100%' height={64} sx={{ marginBottom: '8px' }} />
      <Skeleton variant="rectangular" width='100%' height={64} sx={{ marginBottom: '8px' }} />
      <Skeleton variant="rectangular" width='100%' height={64} sx={{ marginBottom: '8px' }} />
    </Layout>
  )

  return (
    <Layout params={params}>
      {canCreate &&
        <Box component="div" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={() => navigate('/cadastro-usuario')}>Criar usuário</Button>
        </Box>
      }
      {canRenderTable &&
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((u) => (
              <TableRow key={u.uid}>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  {userCanDoAction(u.role as UserRoles) ? (
                    <>
                      <IconButton edge="end" aria-label="edit" onClick={() => navigate(`/editar-usuario/${u.uid}`)}>
                        <EditIcon />
                      </IconButton>
                      {u.isBlocked ? (
                        <IconButton edge="end" aria-label="delete" onClick={() => mutateAsync(u.uid)}>
                          <PlayIcon />
                        </IconButton>
                      ) : (
                        <IconButton edge="end" aria-label="delete" onClick={() => mutateAsync(u.uid)}>
                          <BlockIcon />
                        </IconButton>
                      )}
                    </>
                  ) : (
                    u.isBlocked ? <BlockIcon /> : <></>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>}
    </Layout>
  )
}